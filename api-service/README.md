# ⚙️ سرویس API موتور استخراج — PersianScrapeGraph API Service

پوشش **FastAPI** حول گراف کامل ScrapeGraphAI: همان قدرت واقعی کتابخانه (Playwright/Chromium، RAG، پشتیبانی از +۲۰ مدل LLM) اما از طریق یک REST API ساده — تا داشبورد [`webui/`](../webui/) (که روی Vercel اجرا می‌شود) بتواند از آن استفاده کند.

## 🧩 نقش در معماری

```
┌────────────────┐                         ┌─────────────────────┐
│  webui (Vercel) │   POST /scrape          │   api-service        │
│  Next.js · RTL  │ ─────────────────────► │   FastAPI + SGAI     │
└────────────────┘   SCRAPE_API_URL        │   Playwright + LLM   │
                                            └─────────────────────┘
```

## 🚀 اجرای محلی (بدون داکر)

پیش‌نیاز: Python 3.12+ و در صورت استفاده از مدل محلی، [Ollama](https://ollama.com):

```bash
# از ریشهٔ ریپو
pip install -e .                                  # نصب کتابخانه از سورس
pip install -r api-service/requirements.txt       # FastAPI + Uvicorn
playwright install chromium                       # مرورگر برای FetchNode

# اجرای سرویس روی پورت ۸۰۰۰
uvicorn main:app --app-dir api-service --reload
```

اجرای Ollama در کنار سرویس (اختیاری — برای مدل‌های رایگان محلی):

```bash
docker compose up -d ollama
ollama pull llama3.2        # دانلود مدل
```

## 🐳 اجرا با داکر

```bash
# از ریشهٔ ریپو
docker build -f api-service/Dockerfile -t persianscrapegraph-api .
docker run -p 8000:8000 --env-file api-service/.env persianscrapegraph-api
```

اگر Ollama را با `docker compose` اجرا کرده‌اید، در `.env` مقدار `SGAI_OLLAMA_URL=http://ollama:11434` را بگذارید.

## 📡 API

| متد | مسیر | توضیح |
|---|---|---|
| `GET` | `/health` | بررسی سلامت سرویس |
| `POST` | `/scrape` | اجرای `SmartScraperGraph` |

نمونهٔ درخواست:

```bash
curl -X POST http://localhost:8000/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://books.toscrape.com/", "prompt": "فهرست کتاب‌ها را با عنوان و قیمت استخراج کن", "fields": "title, price"}'
```

پاسخ:

```json
{
  "success": true,
  "data": { "books": [ { "title": "...", "price": "..." } ] },
  "stats": { "durationMs": 24500, "charsProcessed": 0, "model": "ollama/llama3.2" }
}
```

## 🔑 متغیرهای محیطی

| متغیر | پیش‌فرض | توضیح |
|---|---|---|
| `SGAI_MODEL` | `ollama/llama3.2` | مدل پیش‌فرض به شکل `provider/model` |
| `SGAI_OLLAMA_URL` | `http://localhost:11434` | نشانی سرویس Ollama |
| `SGAI_API_KEY` | خالی | کلید مدل‌های ابری (OpenAI/DeepSeek و…) |
| `SCRAPEGRAPHAI_TELEMETRY_ENABLED` | `false` (در داکر) | تله‌متری — در این فورک به‌صورت پیش‌فرض خاموش است |

## ☁️ استقرار

این سرویس باید روی پلتفرمی اجرا شود که **داکر/پراسس پایدار** دارد (نه serverless):

- **Railway / Render / Fly.io**: ریپو را وصل کنید و `Dockerfile` مسیر `api-service/Dockerfile` را به آن بدهید.
- **سرور شخصی (VPS)**: همان دو فرمان `docker build` و `docker run` بالا.

سپس در تنظیمات `webui` روی Vercel، متغیر `SCRAPE_API_URL` را به نشانی این سرویس ست کنید — راهنمای کامل در [docs/deploy-vercel.md](../docs/deploy-vercel.md).
