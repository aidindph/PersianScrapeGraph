"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Clock3,
  Copy,
  Cpu,
  Download,
  Eye,
  FileCode2,
  Globe,
  Hash,
  Layers,
  Loader2,
  RefreshCw,
  SearchCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { JsonViewer } from "@/components/persian/json-viewer";
import { faDateTime, faNum, faSeconds, truncateMiddle } from "@/components/persian/format";

type ScrapeStats = { durationMs: number; charsProcessed: number; model: string };

type RunResult = { id: string; url: string; prompt: string; result: unknown; stats: ScrapeStats };

type HistoryItem = {
  id: string;
  url: string;
  prompt: string;
  fields: string | null;
  durationMs: number;
  charsProcessed: number;
  model: string;
  createdAt: string;
};

const MODEL_OPTIONS = [
  { value: "demo", label: "دمو (رایگان و آنی)" },
  { value: "gpt-4o-mini", label: "GPT-4o-mini" },
  { value: "claude-sonnet", label: "Claude Sonnet" },
  { value: "ollama", label: "Ollama (محلی)" },
];

const MODEL_LABELS: Record<string, string> = {
  demo: "دمو",
  "gpt-4o-mini": "GPT-4o-mini",
  "claude-sonnet": "Claude Sonnet",
  ollama: "Ollama",
};

const LOADING_STEPS = [
  "در حال دریافت صفحه…",
  "پاکسازی متن…",
  "تحلیل با هوش مصنوعی…",
];

const COMING_SOON_TABS = [
  {
    value: "search",
    icon: SearchCheck,
    title: "جستجوی وب",
    description:
      "به‌جای یک آدرس، یک پرسش بپرس؛ موتور جستجو بهترین صفحات را پیدا می‌کند و همان‌ها را استخراج می‌کند.",
  },
  {
    value: "script",
    icon: FileCode2,
    title: "تولید اسکریپت",
    description:
      "از پرامپت فارسی، یک اسکریپت آمادهٔ اجرای ScrapeGraphAI به‌همراه پیکربندی گراف تولید کن.",
  },
  {
    value: "multi",
    icon: Layers,
    title: "چندمنبعی",
    description:
      "چند آدرس و چند سند را هم‌زمان به یک گراف بده و خروجی یکپارچهٔ JSON بگیر.",
  },
];

export function ScraperDashboard() {
  const [url, setUrl] = useState("https://books.toscrape.com/");
  const [prompt, setPrompt] = useState("فهرست کتاب‌های صفحه را با عنوان و قیمت استخراج کن");
  const [fields, setFields] = useState("title, price, rating");
  const [model, setModel] = useState("demo");

  const [loading, setLoading] = useState(false);
  const [statusStep, setStatusStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [viewedId, setViewedId] = useState<string | null>(null);

  const lastPayloadRef = useRef<{ url: string; prompt: string; fields: string; model: string } | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const loadHistory = useCallback(async (silent = false) => {
    if (!silent) setHistoryLoading(true);
    try {
      const res = await fetch("/api/scrape");
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error ?? "خطا");
      setHistory((data.records ?? []) as HistoryItem[]);
    } catch {
      if (!silent) toast({ title: "خواندن تاریخچه ناموفق بود", description: "لطفاً دوباره تلاش کنید." });
    } finally {
      setHistoryLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  // چرخش پیام وضعیت حین اجرا
  useEffect(() => {
    if (!loading) {
      setStatusStep(0);
      return;
    }
    const id = window.setInterval(() => {
      setStatusStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1));
    }, 2400);
    return () => window.clearInterval(id);
  }, [loading]);

  async function runScrape(payload: { url: string; prompt: string; fields: string; model: string }) {
    setLoading(true);
    setError(null);
    lastPayloadRef.current = payload;
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.error ?? "استخراج با خطا روبه‌رو شد.");
      }
      const record = data.record as RunResult;
      setResult(record);
      setViewedId(record.id);
      void loadHistory(true);
      toast({ title: "استخراج انجام شد", description: "نتیجهٔ JSON آماده است." });
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "خطای نامشخصی رخ داد.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    void runScrape({ url, prompt, fields, model });
  }

  function handleRetry() {
    if (lastPayloadRef.current) void runScrape(lastPayloadRef.current);
  }

  async function handleCopy() {
    if (!result) return;
    const text = JSON.stringify(result.result, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "در حافظه کپی شد" });
    } catch {
      toast({ title: "کپی ممکن نشد", description: "مرورگر شما اجازهٔ دسترسی به حافظه را نداد." });
    }
  }

  function handleDownload() {
    if (!result) return;
    try {
      const blob = new Blob([JSON.stringify(result.result, null, 2)], {
        type: "application/json;charset=utf-8",
      });
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = "scraped-data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(href);
      toast({ title: "فایل دانلود شد", description: "scraped-data.json" });
    } catch {
      toast({ title: "دانلود ممکن نشد", description: "دوباره تلاش کنید." });
    }
  }

  async function handleView(id: string) {
    try {
      const res = await fetch(`/api/scrape/${id}`);
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error(data?.error ?? "رکورد پیدا نشد.");
      setResult(data.record as RunResult);
      setViewedId(id);
      setError(null);
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      toast({ title: "بازخوانی رکورد ناموفق بود", description: err instanceof Error ? err.message : undefined });
    }
  }

  async function handleDelete(id: string) {
    const previous = history;
    setHistory((h) => h.filter((r) => r.id !== id));
    if (viewedId === id) setViewedId(null);
    try {
      const res = await fetch(`/api/scrape/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error(data?.error ?? "حذف ناموفق بود.");
      toast({ title: "رکورد حذف شد" });
    } catch (err) {
      setHistory(previous);
      toast({ title: "حذف رکورد ناموفق بود", description: err instanceof Error ? err.message : undefined });
    }
  }

  return (
    <Card className="rounded-2xl border-zinc-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
      <Tabs defaultValue="smart" dir="rtl">
        <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-1 rounded-xl bg-zinc-100 p-1 sm:grid-cols-4">
          <TabsTrigger
            value="smart"
            className="rounded-lg px-3 py-2.5 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm sm:text-sm"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            اسکرپر هوشمند
          </TabsTrigger>
          {COMING_SOON_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-500 data-[state=active]:bg-white data-[state=active]:text-zinc-800 data-[state=active]:shadow-sm sm:text-sm"
            >
              <tab.icon className="h-4 w-4" aria-hidden="true" />
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="smart" className="mt-0 space-y-8 focus-visible:outline-none">
          <form onSubmit={handleSubmit} className="grid gap-5" aria-label="فرم استخراج داده">
            <div className="grid gap-5 sm:grid-cols-[1fr_230px]">
              <div className="grid content-start gap-2">
                <Label htmlFor="scrape-url" className="text-sm font-medium text-zinc-700">
                  آدرس صفحهٔ وب
                </Label>
                <Input
                  id="scrape-url"
                  dir="ltr"
                  inputMode="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://books.toscrape.com/"
                  className="h-11 rounded-xl border-zinc-200 bg-white text-left font-mono text-sm text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="grid content-start gap-2">
                <Label htmlFor="scrape-model" className="text-sm font-medium text-zinc-700">
                  مدل زبانی
                </Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger
                    id="scrape-model"
                    className="h-11 w-full rounded-xl border-zinc-200 bg-white text-sm text-zinc-800 focus-visible:ring-emerald-500"
                  >
                    <SelectValue placeholder="انتخاب مدل" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-zinc-200">
                    {MODEL_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="rounded-lg text-sm">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {model !== "demo" ? (
              <p className="-mt-2 text-xs text-zinc-400" role="note">
                «{MODEL_LABELS[model]}» در نسخهٔ سرور واقعی فعال می‌شود.
              </p>
            ) : null}

            <div className="grid gap-2">
              <Label htmlFor="scrape-prompt" className="text-sm font-medium text-zinc-700">
                دستور استخراج
              </Label>
              <Textarea
                id="scrape-prompt"
                required
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثلاً: فهرست کتاب‌ها را با عنوان و قیمت استخراج کن"
                className="min-h-[96px] rounded-xl border-zinc-200 bg-white text-sm leading-7 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="scrape-fields" className="text-sm font-medium text-zinc-700">
                فیلدهای خروجی (اختیاری)
              </Label>
              <Input
                id="scrape-fields"
                dir="ltr"
                value={fields}
                onChange={(e) => setFields(e.target.value)}
                placeholder="title, price, rating"
                className="h-11 rounded-xl border-zinc-200 bg-white text-left font-mono text-sm text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-emerald-500"
              />
              <p className="text-xs text-zinc-400">کلیدهای دلخواه خروجی را با ویرگول جدا کنید.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                disabled={loading}
                className="h-12 gap-2 rounded-xl bg-emerald-600 px-7 text-base font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                ) : (
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                )}
                {loading ? "در حال استخراج…" : "استخراج کن"}
              </Button>
              <p className="text-xs leading-6 text-zinc-400">
                دمو واقعی است: صفحه دریافت، پاکسازی و با هوش مصنوعی تحلیل می‌شود.
              </p>
            </div>
          </form>

          {/* پنل نتیجه */}
          <div ref={resultRef} className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-zinc-50/60">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 sm:px-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                <Globe className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                خروجی استخراج
              </h3>
              {result ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-1.5 rounded-lg border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-normal text-zinc-600">
                    <Clock3 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                    زمان پاسخ: {faSeconds(result.stats.durationMs)} ثانیه
                  </Badge>
                  <Badge variant="outline" className="gap-1.5 rounded-lg border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-normal text-zinc-600">
                    <Hash className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                    {faNum(result.stats.charsProcessed)} کاراکتر پردازش‌شده
                  </Badge>
                  <Badge variant="outline" className="gap-1.5 rounded-lg border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-normal text-zinc-600">
                    <Cpu className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                    مدل: {MODEL_LABELS[result.stats.model] ?? result.stats.model}
                  </Badge>
                  <div className="flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      aria-label="کپی خروجی JSON"
                      className="h-9 gap-1.5 rounded-lg border-zinc-200 bg-white px-3 text-xs text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      کپی
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      aria-label="دانلود خروجی JSON"
                      className="h-9 gap-1.5 rounded-lg border-zinc-200 bg-white px-3 text-xs text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      دانلود JSON
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="p-4 sm:p-5">
              {loading ? (
                <div className="space-y-4" aria-live="polite" aria-busy="true">
                  <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    {LOADING_STEPS[statusStep]}
                  </p>
                  <div className="space-y-2.5">
                    <Skeleton className="h-4 w-11/12 rounded bg-zinc-200/70" />
                    <Skeleton className="h-4 w-4/5 rounded bg-zinc-200/70" />
                    <Skeleton className="h-4 w-full rounded bg-zinc-200/70" />
                    <Skeleton className="h-4 w-2/3 rounded bg-zinc-200/70" />
                    <Skeleton className="h-4 w-5/6 rounded bg-zinc-200/70" />
                  </div>
                </div>
              ) : error ? (
                <Alert variant="destructive" role="alert" className="rounded-xl border-red-200 bg-red-50">
                  <AlertTitle className="text-sm font-bold">استخراج ناموفق بود</AlertTitle>
                  <AlertDescription className="mt-1 text-sm leading-7 text-red-700">{error}</AlertDescription>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRetry}
                    className="mt-3 h-11 gap-2 rounded-lg border-red-200 bg-white px-4 text-sm font-medium text-red-700 hover:bg-red-100"
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    تلاش دوباره
                  </Button>
                </Alert>
              ) : result ? (
                <JsonViewer value={result.result} />
              ) : (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Sparkles className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <p className="max-w-sm text-sm leading-7 text-zinc-500">
                    هنوز استخراجی انجام نشده است. آدرس و دستور را بنویس و دکمهٔ «استخراج کن» را بزن؛
                    نتیجهٔ JSON همین‌جا نمایش داده می‌شود.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* تاریخچه */}
          <div>
            <Separator className="mb-6 bg-zinc-200" />
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-zinc-800">تاریخچهٔ استخراج‌ها</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => void loadHistory()}
                aria-label="به‌روزرسانی تاریخچه"
                className="h-11 w-11 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-emerald-700"
              >
                <RefreshCw className={`h-4 w-4 ${historyLoading ? "animate-spin" : ""}`} aria-hidden="true" />
              </Button>
            </div>

            {historyLoading && history.length === 0 ? (
              <div className="space-y-2.5" aria-live="polite" aria-busy="true">
                <Skeleton className="h-16 w-full rounded-xl bg-zinc-200/70" />
                <Skeleton className="h-16 w-full rounded-xl bg-zinc-200/70" />
                <Skeleton className="h-16 w-full rounded-xl bg-zinc-200/70" />
              </div>
            ) : history.length === 0 ? (
              <p className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/60 px-4 py-6 text-center text-sm text-zinc-500">
                هنوز استخراجی ثبت نشده است؛ اولین استخراج را انجام بده تا اینجا ذخیره شود.
              </p>
            ) : (
              <ul className="persian-scrollbar max-h-96 divide-y divide-zinc-100 overflow-y-auto rounded-xl border border-zinc-200 bg-white" aria-label="فهرست استخراج‌های پیشین">
                {history.map((record) => (
                  <li
                    key={record.id}
                    className={`flex items-center gap-3 px-3 py-3 transition-colors sm:px-4 ${
                      viewedId === record.id ? "bg-emerald-50/60" : "hover:bg-zinc-50"
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
                      <Globe className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p dir="ltr" className="truncate text-left font-mono text-xs text-zinc-700">
                        {truncateMiddle(record.url)}
                      </p>
                      <p className="truncate text-xs text-zinc-500">{record.prompt}</p>
                      <p className="mt-0.5 text-[11px] text-zinc-400">{faDateTime(record.createdAt)}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => void handleView(record.id)}
                        aria-label={`مشاهدهٔ نتیجهٔ ${record.url}`}
                        className="h-11 w-11 rounded-lg text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Eye className="h-4.5 w-4.5" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => void handleDelete(record.id)}
                        aria-label={`حذف رکورد ${record.url}`}
                        className="h-11 w-11 rounded-lg text-zinc-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4.5 w-4.5" aria-hidden="true" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>

        {COMING_SOON_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0 focus-visible:outline-none">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/60 px-6 py-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                <tab.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-zinc-800">{tab.title}</h3>
                <Badge className="rounded-lg bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-800 hover:bg-amber-100">
                  به‌زودی
                </Badge>
              </div>
              <p className="max-w-md text-sm leading-7 text-zinc-500">{tab.description}</p>
              <Button
                type="button"
                disabled
                className="h-11 cursor-not-allowed rounded-xl bg-zinc-200 px-6 text-sm font-medium text-zinc-400"
                aria-disabled="true"
              >
                این قابلیت به‌زودی فعال می‌شود
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
