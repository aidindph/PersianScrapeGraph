"use client";

import { Github, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faFullDate, useMounted } from "@/components/persian/format";

const NAV_LINKS = [
  { href: "#dashboard", label: "داشبورد" },
  { href: "#features", label: "قابلیت‌ها" },
  { href: "#pipeline", label: "چرخهٔ کار" },
  { href: "#quickstart", label: "شروع سریع" },
];

export function SiteHeader() {
  const mounted = useMounted();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#dashboard"
          className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
          aria-label="اسکرپ‌گراف فارسی — رفتن به داشبورد"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Network className="h-5.5 w-5.5" aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-base font-bold text-zinc-900">اسکرپ‌گراف فارسی</span>
            <span dir="ltr" className="hidden truncate font-mono text-[10px] tracking-wide text-zinc-400 sm:block">
              PersianScrapeGraph
            </span>
          </span>
        </a>

        <nav aria-label="ناوبری اصلی" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-emerald-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className="hidden whitespace-nowrap rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-600 sm:inline-flex"
            aria-live="polite"
          >
            امروز: {mounted ? faFullDate(new Date()) : "…"}
          </span>
          <Button
            asChild
            variant="outline"
            className="h-11 gap-2 rounded-xl border-zinc-200 px-4 text-sm font-medium text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <a
              href="https://github.com/aidindph/PersianScrapeGraph"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="مخزن گیت‌هاب PersianScrapeGraph"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">گیت‌هاب</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
