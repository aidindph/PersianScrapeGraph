# مثال گراف اسکرپر JSON (JSON Scraper Graph)

این مثال نشان می‌دهد چگونه می‌توان با Scrapegraph-ai دادهٔ JSON را از منابع وب استخراج و پردازش کرد.

## قابلیت‌ها

- استخراج دادهٔ JSON
- اعتبارسنجی اسکیما (schema validation)
- تبدیل داده
- خروجی ساخت‌یافته

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import JsonScraperGraph

graph = JsonScraperGraph()
json_data = graph.scrape("https://api.example.com/data")
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
