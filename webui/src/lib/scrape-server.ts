/**
 * ابزارهای سمت سرور برای موتور اسکرپ دمو «اسکرپ‌گراف فارسی».
 * فقط در API Route ها استفاده شود (server-side).
 */

export const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export const FETCH_TIMEOUT_MS = 20_000;
export const MAX_BODY_CHARS = 800 * 1024; // سقف تقریبی ۸۰۰ کیلوبایت
export const MAX_TEXT_CHARS = 9_000; // متن نهایی ارسالی به LLM

/** پرامپت سیستمی موتور استخراج (طبق قرارداد پروژه) */
export const EXTRACTION_SYSTEM_PROMPT =
  'تو موتور استخراج دادهٔ اسکرپ‌گراف فارسی هستی. فقط و فقط JSON معتبر و بدون هیچ متن اضافه برگردان. ساختار: {"data": <استخراج بر اساس دستور کاربر>, "summary": "<یک جمله جمع‌بندی فارسی>"}';

/** حذف تگ‌ها، اسکریپت‌ها و نویزها + تبدیل موجودیت‌های پایهٔ HTML */
export function cleanHtml(html: string): string {
  let text = html;
  text = text
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(br|hr)\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|tr|td|th|h[1-6]|section|article|header|footer|nav|table|thead|tbody|ul|ol|dl|dd|dt|blockquote|figure|figcaption)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");

  // موجودیت‌های پرکاربرد
  text = text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&(?:#39|apos);/gi, "'")
    .replace(/&hellip;/gi, "…")
    .replace(/&mdash;/gi, "—")
    .replace(/&ndash;/gi, "–")
    .replace(/&middot;/gi, "·")
    .replace(/&laquo;/gi, "«")
    .replace(/&raquo;/gi, "»")
    .replace(/&#x([0-9a-f]+);/gi, (_m, code: string) => safeCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_m, code: string) => safeCodePoint(parseInt(code, 10)));

  // فشرده‌سازی فاصله‌ها
  text = text
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();

  return text;
}

function safeCodePoint(code: number): string {
  try {
    return String.fromCodePoint(code);
  } catch {
    return "";
  }
}

/**
 * استخراج JSON از پاسخ خام LLM:
 * حذف ```json fences، بریدن متن اضافه قبل/بعد، سپس JSON.parse.
 * اگر موفق نشود null برمی‌گرداند.
 */
export function extractJson(raw: string): unknown | null {
  if (!raw) return null;
  let s = raw.trim();

  // حذف پوشش کد
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence && fence[1].trim()) s = fence[1].trim();

  // برداشتن متن اضافه دور JSON
  const first = s.search(/[{[]/);
  if (first > 0) s = s.slice(first);
  const lastCurly = s.lastIndexOf("}");
  const lastSquare = s.lastIndexOf("]");
  const last = Math.max(lastCurly, lastSquare);
  if (last !== -1) s = s.slice(0, last + 1);

  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

/** اعتبارسنجی آدرس ورودی؛ در صورت نامعتبر بودن null برمی‌گرداند */
export function normalizeUrl(input: string): URL | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
  return parsed;
}
