import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import type { ChatMessage } from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import {
  BROWSER_UA,
  EXTRACTION_SYSTEM_PROMPT,
  FETCH_TIMEOUT_MS,
  MAX_BODY_CHARS,
  MAX_TEXT_CHARS,
  cleanHtml,
  extractJson,
  normalizeUrl,
} from "@/lib/scrape-server";

export const runtime = "nodejs";

const ALLOWED_MODELS = new Set(["demo", "gpt-4o-mini", "claude-sonnet", "ollama"]);

/** مهلت موتور واقعی — اجرای گراف کامل روی صفحات سنگین زمان‌بر است */
const ENGINE_TIMEOUT_MS = 180_000;

const ENGINE_HINT =
  "برای فعال‌سازی استخراج واقعی، متغیر محیطی SCRAPE_API_URL را به سرویس api-service متصل کنید (راهنمای کامل: docs/deploy-vercel.md).";

type RecordData = {
  url: string;
  prompt: string;
  fields: string | null;
  resultJson: string;
  durationMs: number;
  charsProcessed: number;
  model: string;
};

/**
 * ذخیرهٔ امن رکورد در تاریخچه.
 * اگر دیتابیس در دسترس نباشد (مثلاً در محیط serverless بدون دیتابیس پایدار)،
 * نتیجهٔ استخراج همچنان به کاربر برگردانده می‌شود و فقط تاریخچه ذخیره نمی‌شود.
 */
async function saveRecordSafe(data: RecordData) {
  try {
    return await db.scrapeRecord.create({ data });
  } catch (error) {
    console.warn("[db] ذخیرهٔ رکورد تاریخچه انجام نشد (ادامه بدون تاریخچه):", error);
    return null;
  }
}

/** POST /api/scrape — استخراج ساخت‌یافته از یک صفحهٔ وب */
export async function POST(request: Request) {
  try {
    let body: { url?: unknown; prompt?: unknown; fields?: unknown; model?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "بدنهٔ درخواست معتبر نیست." },
        { status: 400 }
      );
    }

    const rawUrl = typeof body.url === "string" ? body.url : "";
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    const fields = typeof body.fields === "string" ? body.fields.trim() : "";
    const model = typeof body.model === "string" && ALLOWED_MODELS.has(body.model) ? body.model : "demo";

    const url = normalizeUrl(rawUrl);
    if (!url) {
      return NextResponse.json(
        { success: false, error: "آدرس صفحه باید با http:// یا https:// شروع شود و معتبر باشد." },
        { status: 400 }
      );
    }
    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "دستور استخراج را وارد کنید؛ مثلاً: «فهرست کتاب‌ها را با عنوان و قیمت استخراج کن»." },
        { status: 400 }
      );
    }
    if (prompt.length > 2000) {
      return NextResponse.json(
        { success: false, error: "دستور استخراج بیش از حد طولانی است (حداکثر ۲۰۰۰ نویسه)." },
        { status: 400 }
      );
    }

    // ─── حالت ۱: موتور واقعی (api-service) ─────────────────────────────
    // اگر SCRAPE_API_URL تنظیم شده باشد، اجرای گراف کامل ScrapeGraphAI به
    // سرویس FastAPI خارجی (Docker/Railway/Render/…) سپرده می‌شود.
    const engineUrl = process.env.SCRAPE_API_URL?.replace(/\/+$/, "");
    if (engineUrl) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), ENGINE_TIMEOUT_MS);
      try {
        const res = await fetch(`${engineUrl}/scrape`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.toString(), prompt, fields, model }),
          signal: controller.signal,
        });
        const payload = (await res.json().catch(() => null)) as
          | { success?: boolean; data?: unknown; stats?: { durationMs?: number; charsProcessed?: number; model?: string }; detail?: string; error?: string }
          | null;
        if (!res.ok || !payload?.success) {
          return NextResponse.json(
            {
              success: false,
              error: payload?.detail || payload?.error || "موتور استخراج با خطا روبه‌رو شد.",
            },
            { status: 502 }
          );
        }
        const data = payload.data ?? null;
        if (data === null || typeof data !== "object") {
          return NextResponse.json(
            { success: false, error: "پاسخ موتور استخراج قابل پردازش نبود." },
            { status: 502 }
          );
        }
        const stats = payload.stats ?? {};
        const record = await saveRecordSafe({
          url: url.toString(),
          prompt,
          fields: fields || null,
          resultJson: JSON.stringify(data),
          durationMs: stats.durationMs ?? 0,
          charsProcessed: stats.charsProcessed ?? 0,
          model: stats.model ?? "engine",
        });
        return NextResponse.json({
          success: true,
          record: {
            id: record?.id ?? null,
            url: url.toString(),
            prompt,
            result: data,
            stats: {
              durationMs: stats.durationMs ?? 0,
              charsProcessed: stats.charsProcessed ?? 0,
              model: stats.model ?? "engine",
            },
          },
        });
      } catch (err) {
        const aborted = err instanceof Error && err.name === "AbortError";
        return NextResponse.json(
          {
            success: false,
            error: aborted
              ? "زمان اجرای موتور استخراج بیش از حد طولانی شد و درخواست متوقف شد."
              : "اتصال به موتور استخراج ممکن نشد؛ نشانی SCRAPE_API_URL و در دسترس بودن سرویس را بررسی کنید.",
          },
          { status: 502 }
        );
      } finally {
        clearTimeout(timeout);
      }
    }

    // ─── حالت ۲: موتور دمو (دریافت صفحه + LLM) ────────────────────────
    // ۱) دریافت صفحه
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let html: string;
    try {
      const res = await fetch(url.toString(), {
        signal: controller.signal,
        redirect: "follow",
        headers: {
          "User-Agent": BROWSER_UA,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "fa,en;q=0.9",
        },
      });
      if (!res.ok) {
        return NextResponse.json(
          { success: false, error: `دریافت صفحه ناموفق بود (کد وضعیت ${res.status}).` },
          { status: 502 }
        );
      }
      const contentType = res.headers.get("content-type") ?? "";
      if (!contentType.includes("text/html")) {
        return NextResponse.json(
          { success: false, error: "پاسخ این آدرس از نوع HTML نیست؛ فقط صفحات وب قابل استخراج هستند." },
          { status: 400 }
        );
      }
      html = (await res.text()).slice(0, MAX_BODY_CHARS);
    } catch (err) {
      const aborted = err instanceof Error && err.name === "AbortError";
      return NextResponse.json(
        {
          success: false,
          error: aborted
            ? "دریافت صفحه بیش از ۲۰ ثانیه طول کشید و متوقف شد."
            : "اتصال به آدرس ممکن نشد؛ لطفاً اتصال شبکه یا درستی آدرس را بررسی کنید.",
        },
        { status: 502 }
      );
    } finally {
      clearTimeout(timeout);
    }

    // ۲) پاکسازی متن
    const cleaned = cleanHtml(html);
    if (!cleaned) {
      return NextResponse.json(
        { success: false, error: "متنی برای تحلیل در این صفحه پیدا نشد." },
        { status: 422 }
      );
    }
    const pageText = cleaned.slice(0, MAX_TEXT_CHARS);

    // ۳) تحلیل با LLM (فقط سمت سرور)
    let userContent = `${prompt}\n`;
    if (fields) {
      userContent += `کلیدهای اصلی data این‌ها باشند: ${fields}\n`;
    }
    userContent += `متن صفحه:\n${pageText}`;

    const messages: ChatMessage[] = [
      { role: "assistant", content: EXTRACTION_SYSTEM_PROMPT },
      { role: "user", content: userContent },
    ];

    const startedAt = Date.now();
    let zai: Awaited<ReturnType<typeof ZAI.create>>;
    try {
      zai = await ZAI.create();
    } catch {
      // SDK در این محیط پیکربندی نشده است (مثلاً استقرار روی Vercel بدون اعتبارنامه)
      return NextResponse.json(
        {
          success: false,
          error: `حالت دموی هوش مصنوعی در این محیط پیکربندی نشده است. ${ENGINE_HINT}`,
        },
        { status: 503 }
      );
    }
    let raw = "";
    try {
      const completion = await zai.chat.completions.create({
        messages,
        thinking: { type: "disabled" },
        temperature: 0.2,
      });
      raw = completion?.choices?.[0]?.message?.content ?? "";
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: `تحلیل با هوش مصنوعی با خطا روبه‌رو شد؛ چند لحظه بعد دوباره تلاش کنید. ${ENGINE_HINT}`,
        },
        { status: 502 }
      );
    }

    let parsed = extractJson(raw);
    if (parsed === null) {
      // تلاش دوباره: درخواست JSON خالص
      messages.push({ role: "assistant", content: raw || "" });
      messages.push({
        role: "user",
        content: "پاسخ قبلی JSON معتبر نبود. فقط و فقط JSON خالص و معتبر برگردان — بدون توضیح، بدون fence و بدون متن اضافه.",
      });
      try {
        const retry = await zai.chat.completions.create({
          messages,
          thinking: { type: "disabled" },
          temperature: 0,
        });
        raw = retry?.choices?.[0]?.message?.content ?? "";
        parsed = extractJson(raw);
      } catch {
        parsed = null;
      }
    }
    if (parsed === null || typeof parsed !== "object") {
      return NextResponse.json(
        { success: false, error: "پاسخ هوش مصنوعی قابل تبدیل به JSON نبود؛ لطفاً دوباره تلاش کنید." },
        { status: 502 }
      );
    }

    const durationMs = Date.now() - startedAt;

    // ۴) ذخیرهٔ رکورد (اختیاری — اگر دیتابیس در دسترس نبود، نتیجه همچنان برگردانده می‌شود)
    const record = await saveRecordSafe({
      url: url.toString(),
      prompt,
      fields: fields || null,
      resultJson: JSON.stringify(parsed),
      durationMs,
      charsProcessed: cleaned.length,
      model,
    });

    return NextResponse.json({
      success: true,
      record: {
        id: record?.id ?? null,
        url: url.toString(),
        prompt,
        result: parsed,
        stats: {
          durationMs,
          charsProcessed: cleaned.length,
          model: "demo",
        },
      },
    });
  } catch (error) {
    console.error("[POST /api/scrape]", error);
    return NextResponse.json(
      { success: false, error: "خطای غیرمنتظره‌ای رخ داد؛ لطفاً دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}

/** GET /api/scrape — ۳۰ رکورد آخر بدون resultJson */
export async function GET() {
  try {
    const records = await db.scrapeRecord.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      select: {
        id: true,
        url: true,
        prompt: true,
        fields: true,
        durationMs: true,
        charsProcessed: true,
        model: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ success: true, records });
  } catch (error) {
    // در محیط‌های بدون دیتابیس پایدار (serverless)، تاریخچهٔ خالی برگردانده می‌شود
    console.warn("[GET /api/scrape] تاریخچه در دسترس نیست:", error);
    return NextResponse.json({ success: true, records: [] });
  }
}
