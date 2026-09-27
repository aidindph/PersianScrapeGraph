import { Brain, CalendarDays, Languages, Server, ShieldCheck, Workflow } from "lucide-react";
import { Card } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Workflow,
    title: "گراف‌های آمادهٔ هوشمند",
    description: "۲۶ گراف از پیش ساخته‌شده برای کارهای رایج؛ فقط پرامپت بده و اجرا کن.",
    tone: "emerald" as const,
  },
  {
    icon: Brain,
    title: "پشتیبانی از +۲۰ مدل LLM",
    description: "از GPT و Claude تا مدل‌های متن‌باز؛ هر موتوری که دوست داری انتخاب کن.",
    tone: "amber" as const,
  },
  {
    icon: Server,
    title: "اجرای محلی و رایگان با Ollama",
    description: "بدون نیاز به سرویس خارجی و تحریم‌زدایی کامل با مدل‌های لوکال.",
    tone: "emerald" as const,
  },
  {
    icon: Languages,
    title: "رابط کامل فارسی و راست‌چین",
    description: "تجربه‌ای بومی با تایپوگرافی درست فارسی و فونت ایران‌یکان.",
    tone: "amber" as const,
  },
  {
    icon: CalendarDays,
    title: "تقویم جلالی و بومی‌سازی کامل",
    description: "تاریخ‌ها با تقویم هجری شمسی و اعداد فارسی در کل رابط.",
    tone: "emerald" as const,
  },
  {
    icon: ShieldCheck,
    title: "متن‌باز با مجوز MIT",
    description: "آزاد برای هر استفاده‌ای؛ کد کامل پروژه روی گیت‌هاب در دسترس است.",
    tone: "amber" as const,
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-white py-16 sm:py-20" aria-labelledby="features-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">قابلیت‌ها</span>
          <h2 id="features-title" className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            هر چیزی که یک خزندهٔ هوشمند لازم دارد
          </h2>
          <p className="mt-4 text-sm leading-8 text-zinc-600 sm:text-base">
            اسکرپ‌گراف فارسی چارچوب کامل ScrapeGraphAI را با بومی‌سازی فارسی کنار هم گذاشته است؛
            برای پژوهش، تحلیل داده و پایش وب — به زبان خودت.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="قابلیت‌های پروژه">
          {FEATURES.map((feature) => (
            <li key={feature.title}>
              <Card className="h-full rounded-2xl border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    feature.tone === "emerald"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-500"
                  }`}
                  aria-hidden="true"
                >
                  <feature.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-zinc-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{feature.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
