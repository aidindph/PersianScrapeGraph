"use client";

import { ExternalLink, Github, Network, Scale } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { faYear, useMounted } from "@/components/persian/format";

const PROJECT_LINKS = [
  { href: "https://github.com/aidindph/PersianScrapeGraph", label: "گیت‌هاب فورک (PersianScrapeGraph)" },
  { href: "https://github.com/ScrapeGraphAI/Scrapegraph-ai", label: "ScrapeGraphAI اصلی" },
  { href: "https://github.com/aidindph/PersianScrapeGraph/blob/main/LICENSE", label: "مجوز MIT" },
];

export function SiteFooter() {
  const mounted = useMounted();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Network className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-base font-bold text-zinc-900">اسکرپ‌گراف فارسی</span>
            </div>
            <p className="mt-4 max-w-xs text-xs leading-6 text-zinc-500">
              فورکی از ScrapeGraphAI با بومی‌سازی کامل فارسی — تقویم جلالی، رابط راست‌چین و فونت ایران‌یکان.
            </p>
          </div>

          <nav aria-label="پیوندهای پروژه">
            <h3 className="text-sm font-bold text-zinc-900">پروژه</h3>
            <ul className="mt-4 space-y-1">
              {PROJECT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg py-1.5 text-sm text-zinc-600 transition-colors hover:text-emerald-700"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold text-zinc-900">توسعه‌دهنده فارسی و UI</h3>
            <a
              href="https://parsnest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center rounded-lg transition-opacity hover:opacity-80"
              aria-label="وب‌سایت آشیانه پارس — طراحی سایت و طراحی نرم‌افزار"
            >
              <img src="/parsnest-logo.png" alt="لوگوی آشیانه پارس" className="h-9 w-auto" />
            </a>
            <p className="mt-3 max-w-xs text-xs leading-6 text-zinc-500">
              ترجمهٔ کامل پروژه به فارسی، طراحی رابط کاربری راست‌چین با فونت ایران‌یکان و تقویم جلالی، و آماده‌سازی استقرار روی Vercel — توسط آشیانه پارس.
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="https://parsnest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:text-amber-600"
                >
                  طراحی سایت
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://parsnest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:text-amber-600"
                >
                  طراحی نرم‌افزار
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-900">ساخته‌شده به نام</h3>
            <a
              href="https://github.com/aidindph"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-zinc-800 transition-colors hover:text-emerald-700"
              aria-label="پروفایل گیت‌هاب عایدین قاسمی"
            >
              <Github className="h-4 w-4 text-zinc-400" aria-hidden="true" />
              Aidin Ghassemi
              <span className="text-zinc-400">(عایدین قاسمی)</span>
            </a>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
              <Scale className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
              کد‌باز و آزاد تحت مجوز MIT
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-200" />

        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-zinc-400 sm:flex-row sm:text-start">
          <p>© {mounted ? faYear(new Date()) : "…"} — PersianScrapeGraph</p>
          <p>ساخته‌شده با ♥ و یک گراف هوشمند</p>
        </div>
      </div>
    </footer>
  );
}
