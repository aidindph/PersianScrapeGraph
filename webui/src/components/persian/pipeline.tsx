import { FileText, Globe, Search, Sparkles } from "lucide-react";

const STEPS = [
  {
    num: "۱",
    icon: Globe,
    title: "دریافت صفحه",
    description: "آدرس را می‌دهی؛ صفحه با یک خوانندهٔ شبیه مرورگر بارگیری می‌شود.",
  },
  {
    num: "۲",
    icon: FileText,
    title: "پاکسازی و آماده‌سازی متن",
    description: "اسکریپت، استایل و تگ‌های اضافه حذف می‌شوند تا متن خالص بماند.",
  },
  {
    num: "۳",
    icon: Search,
    title: "بازیابی اطلاعات مرتبط",
    description: "بخش‌های مرتبط با دستور تو از دل متن پیدا و جدا می‌شوند.",
  },
  {
    num: "۴",
    icon: Sparkles,
    title: "پاسخ نهایی LLM",
    description: "مدل زبانی خروجی را به JSON ساخت‌یافته و خوانا تبدیل می‌کند.",
  },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="scroll-mt-24 bg-zinc-50 py-16 sm:py-20" aria-labelledby="pipeline-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">چرخهٔ کار</span>
          <h2 id="pipeline-title" className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            از آدرس تا JSON، در چهار گام
          </h2>
          <p className="mt-4 text-sm leading-8 text-zinc-600 sm:text-base">
            همان خط لوله‌ای که ScrapeGraphAI در پشت صحنه اجرا می‌کند — این‌بار شفاف و به زبان فارسی.
          </p>
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute hidden h-0.5 rounded-full bg-gradient-to-l from-zinc-200 via-emerald-300/70 to-zinc-200 lg:top-[3.4rem] lg:block lg:start-[13%] lg:end-[13%]"
          />
          <ol className="relative grid gap-6 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li
                key={step.num}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white" aria-hidden="true">
                    {step.num}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600" aria-hidden="true">
                    <step.icon className="h-5.5 w-5.5" />
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-zinc-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
