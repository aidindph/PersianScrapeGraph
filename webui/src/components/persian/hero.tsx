import { ArrowDown, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "۲۶", label: "گراف آماده" },
  { value: "+۲۰", label: "مدل زبانی پشتیبانی‌شده" },
  { value: "۲٬۹۶۴", label: "کامیت" },
  { value: "MIT", label: "مجوز متن‌باز" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 start-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-100/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-800">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            نسخهٔ ۲.۳.۰ · فورک فارسی ScrapeGraphAI
          </span>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.25] tracking-tight text-zinc-900 sm:text-5xl sm:leading-[1.2]">
            یک بار اسکرپ کن،
            <span className="text-amber-500"> هر چه بخواهی </span>
            بگیر
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
            اسکرپ‌گراف فارسی با قدرت مدل‌های زبانی، صفحات وب را می‌خواند، پاکسازی می‌کند و
            دقیقاً همان داده‌ای را که می‌خواهی — به‌صورت JSON ساخت‌یافته — تحویل می‌دهد؛
            بدون نوشتن حتی یک خط کد خزنده.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 w-full rounded-xl bg-emerald-600 px-7 text-base font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:w-auto"
            >
              <a href="#dashboard" aria-label="شروع استخراج — رفتن به داشبورد">
                شروع استخراج
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-xl border-zinc-300 bg-white px-7 text-base font-semibold text-zinc-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 sm:w-auto"
            >
              <a href="#quickstart" aria-label="شروع سریع — رفتن به راهنما">
                شروع سریع
              </a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-zinc-400">
            یا{" "}
            <a
              href="https://github.com/aidindph/PersianScrapeGraph"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-emerald-700 underline-offset-4 hover:underline"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              کد را روی گیت‌هاب ببین
            </a>
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="آمار پروژه">
          {STATS.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-2xl font-bold text-emerald-700" dir="rtl">
                {stat.value}
              </span>
              <span className="text-xs text-zinc-500">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
