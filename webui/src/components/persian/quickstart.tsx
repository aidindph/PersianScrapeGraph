"use client";

import { Terminal } from "lucide-react";
import { CodeBlock } from "@/components/persian/code-block";

const INSTALL_CODE = "pip install scrapegraphai";

const PYTHON_CODE = `from scrapegraphai.graphs import SmartScraperGraph

# پیکربندی گراف با مدل محلی Ollama (رایگان و بدون تحریم)
graph_config = {
    "llm": {
        "model": "ollama/llama3",
        "base_url": "http://localhost:11434",
        "temperature": 0,
    },
    "verbose": True,
}

# ساخت گراف هوشمند با یک پرامپت فارسی
smart_scraper_graph = SmartScraperGraph(
    prompt="فهرست کتاب‌ها را با عنوان و قیمت استخراج کن",
    source="https://books.toscrape.com/",
    config=graph_config,
)

# اجرای گراف و گرفتن خروجی JSON
result = smart_scraper_graph.run()
print(result)`;

const DOCKER_CODE = `# اجرای سرویس Ollama برای مدل محلی
docker compose up -d ollama`;

export function Quickstart() {
  return (
    <section id="quickstart" className="scroll-mt-24 bg-white py-16 sm:py-20" aria-labelledby="quickstart-title">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">شروع سریع</span>
          <h2 id="quickstart-title" className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            در کمتر از یک دقیقه اولین استخراج
          </h2>
          <p className="mt-4 text-sm leading-8 text-zinc-600 sm:text-base">
            کتابخانه را نصب کن، یک گراف هوشمند با پرامپت فارسی بساز و اجرا کن.
            برای اجرای محلیِ رایگان، فقط کافی است Ollama با Docker بالا بیاید.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Terminal className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              گام ۱ — نصب کتابخانه
            </div>
            <CodeBlock code={INSTALL_CODE} label="terminal" />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Terminal className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              گام ۲ — اولین گراف هوشمند (با مدل محلی Ollama)
            </div>
            <CodeBlock code={PYTHON_CODE} label="scraper.py" />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Terminal className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              گام ۳ — اجرای Ollama در پس‌زمینه (اختیاری برای مدل محلی)
            </div>
            <CodeBlock code={DOCKER_CODE} label="terminal" />
            <p className="text-xs leading-6 text-zinc-500">
              اگر Ollama را از قبل نصب کرده‌ای، این گام لازم نیست؛ فقط مطمئن شو سرویس روی پورت ۱۱۴۳۴ در حال اجراست.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
