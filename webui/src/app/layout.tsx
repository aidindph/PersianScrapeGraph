import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "اسکرپ‌گراف فارسی | استخراج دادهٔ هوشمند با LLM",
  description:
    "داشبورد فارسی و راست‌چین اسکرپ‌گراف فارسی — فورکی از ScrapeGraphAI برای استخراج دادهٔ ساخت‌یافته از صفحات وب با هوش مصنوعی.",
  keywords: [
    "اسکرپ",
    "استخراج داده",
    "ScrapeGraphAI",
    "PersianScrapeGraph",
    "LLM",
    "خزدنده وب",
  ],
  authors: [{ name: "Aidin Ghassemi" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "اسکرپ‌گراف فارسی | استخراج دادهٔ هوشمند با LLM",
    description:
      "یک بار اسکرپ کن، هر چه بخواهی بگیر — استخراج دادهٔ ساخت‌یافته از وب با مدل‌های زبانی.",
    siteName: "PersianScrapeGraph",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
