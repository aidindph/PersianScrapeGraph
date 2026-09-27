import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/scrape/[id] — رکورد کامل با JSON تجزیه‌شده */
export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const record = await db.scrapeRecord.findUnique({ where: { id } });
    if (!record) {
      return NextResponse.json(
        { success: false, error: "این رکورد پیدا نشد یا قبلاً حذف شده است." },
        { status: 404 }
      );
    }
    let result: unknown = null;
    try {
      result = JSON.parse(record.resultJson);
    } catch {
      result = { data: null, summary: "خروجی ذخیره‌شده قابل بازیابی نبود." };
    }
    return NextResponse.json({
      success: true,
      record: {
        id: record.id,
        url: record.url,
        prompt: record.prompt,
        result,
        stats: {
          durationMs: record.durationMs,
          charsProcessed: record.charsProcessed,
          model: "demo",
        },
      },
    });
  } catch (error) {
    console.error("[GET /api/scrape/:id]", error);
    return NextResponse.json(
      { success: false, error: "خواندن رکورد ممکن نشد." },
      { status: 500 }
    );
  }
}

/** DELETE /api/scrape/[id] — حذف رکورد */
export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const existing = await db.scrapeRecord.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "این رکورد پیدا نشد یا قبلاً حذف شده است." },
        { status: 404 }
      );
    }
    await db.scrapeRecord.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/scrape/:id]", error);
    return NextResponse.json(
      { success: false, error: "حذف رکورد ممکن نشد." },
      { status: 500 }
    );
  }
}
