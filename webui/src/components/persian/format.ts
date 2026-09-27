/** ابزارهای قالب‌بندی فارسی (fa-IR) برای استفاده در اجزای سمت کلاینت */
import { useSyncExternalStore } from "react";

/** عدد با ارقام فارسی و جداکنندهٔ هزارگان */
export function faNum(n: number): string {
  return n.toLocaleString("fa-IR");
}

/** میلی‌ثانیه → رشتهٔ «۳٫۲» برای نمایش کنار «ثانیه» */
export function faSeconds(ms: number): string {
  return (ms / 1000).toLocaleString("fa-IR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}

/** تاریخ و ساعت عددی جلالی مثل «۱۴۰۴/۰۷/۰۵ – ۱۴:۳۲» */
export function faDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "short",
    timeStyle: "short",
  })
    .format(d)
    .replace("،", "–");
}

/** تاریخ کامل جلالی مثل «جمعه ۵ مهر ۱۴۰۴» */
export function faFullDate(d: Date): string {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "full" }).format(d);
}

/** سال جلالی جاری مثل «۱۴۰۴» */
export function faYear(d: Date): string {
  return new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(d);
}

/** کوتاه‌کردن آدرس از وسط با سه‌نقطه */
export function truncateMiddle(s: string, max = 42): string {
  if (s.length <= max) return s;
  const half = Math.floor((max - 1) / 2);
  return `${s.slice(0, half)}…${s.slice(s.length - half)}`;
}


const emptySubscribe = () => () => {};

/** در رندر سمت سرور false و پس از hydration در کلاینت true برمی‌گرداند */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
