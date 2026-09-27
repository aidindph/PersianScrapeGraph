# مثال گراف اسکرپر CSV (CSV Scraper Graph)

این مثال نشان می‌دهد چگونه می‌توان با Scrapegraph-ai داده را از منابع وب استخراج و در قالب CSV ذخیره کرد.

## قابلیت‌ها

- استخراج دادهٔ جدولی
- قالب‌بندی CSV
- پاک‌سازی داده
- خروجی ساخت‌یافته

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import CsvScraperGraph

graph = CsvScraperGraph()
csv_data = graph.scrape("https://example.com/table")
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
