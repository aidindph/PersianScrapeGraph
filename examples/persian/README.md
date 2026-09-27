# 🇮🇷 مثال‌های فارسی

این پوشه، مثال‌هایی از استفادهٔ ScrapeGraphAI با **پرومپت و کامنت فارسی** را در بر دارد. هدف این مثال‌ها نشان‌دادن این است که می‌توان بدون حتی یک خط کد اضافه، داده را با دستورات زبان طبیعیِ فارسی از وب‌سایت‌ها استخراج کرد.

## مثال‌های موجود

| فایل | LLM | توضیح |
|------|-----|-------|
| `smart_scraper_persian_ollama.py` | Ollama (`llama3.2`) | استخراج فهرست کتاب‌ها (عنوان، قیمت، امتیاز) از `https://books.toscrape.com` با مدل محلی |
| `smart_scraper_persian_openai.py` | OpenAI (`gpt-4o-mini`) | همان سناریو، اما با سرویس OpenAI |

هر دو مثال از گراف `SmartScraperGraph` استفاده می‌کنند — رایج‌ترین پایپ‌لاین کتابخانه — و ساختار آن‌ها آینهٔ مثال‌های `examples/smart_scraper_graph/ollama/` و `examples/smart_scraper_graph/openai/` است.

پرومپت هر دو مثال یکسان است:

> «فهرست کتاب‌ها را با عنوان، قیمت و امتیاز استخراج کن»

## پیش‌نیازها

1. نصب کتابخانه و مرورگر Playwright:

```bash
pip install scrapegraphai

# IMPORTANT (for fetching websites content)
playwright install
```

2. **برای مثال Ollama:** سرویس [Ollama](https://ollama.com/) را نصب و اجرا کنید و مدل را دانلود کنید:

```bash
ollama pull llama3.2
```

به‌طور پیش‌فرض فرض شده است که Ollama روی `http://localhost:11434` در حال اجراست.

3. **برای مثال OpenAI:** کلید API خود را در متغیر محیطی `OPENAI_APIKEY` قرار دهید (مثلاً در یک فایل `.env` کنار همین مثال‌ها):

```env
OPENAI_APIKEY=YOUR_OPENAI_API_KEY
```

## اجرا

```bash
# با Ollama (LLM محلی و بدون نیاز به کلید API)
python smart_scraper_persian_ollama.py

# با OpenAI
python smart_scraper_persian_openai.py
```

## نکته‌ها

- خروجی هر دو مثال، دادهٔ ساخت‌یافته (دیکشنری/JSON) حاوی عنوان، قیمت و امتیاز کتاب‌ها خواهد بود.
- در پایان اجرا، اطلاعات اجرای گراف (زمان و وضعیت هر node) نیز چاپ می‌شود.
- اگر می‌خواهید خروجی را به قالب دیگری ببینید، فقط کافی است پرومپت فارسی را عوض کنید — بدون تغییر در کد!
- برای مستندسازی فارسی بیشتر، [README اصلی پروژه](../../README.md) را ببینید.
