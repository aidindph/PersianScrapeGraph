import { Features } from "@/components/persian/features";
import { Hero } from "@/components/persian/hero";
import { Pipeline } from "@/components/persian/pipeline";
import { Quickstart } from "@/components/persian/quickstart";
import { ScraperDashboard } from "@/components/persian/scraper-dashboard";
import { SiteFooter } from "@/components/persian/site-footer";
import { SiteHeader } from "@/components/persian/site-header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <section id="dashboard" className="scroll-mt-24 bg-zinc-50 py-16 sm:py-20" aria-labelledby="dashboard-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">داشبورد</span>
              <h2 id="dashboard-title" className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                اسکرپر هوشمند، همین‌جا و همین حالا
              </h2>
              <p className="mt-4 text-sm leading-8 text-zinc-600 sm:text-base">
                آدرس صفحه را بده، به زبان فارسی بگو چه می‌خواهی و خروجی JSON ساخت‌یافته را بگیر —
                بدون نیاز به کلید API یا نصب چیزی.
              </p>
            </div>
            <div className="mt-12">
              <ScraperDashboard />
            </div>
          </div>
        </section>

        <Features />
        <Pipeline />
        <Quickstart />
      </main>
      <SiteFooter />
    </div>
  );
}
