# مثال گراف اسکرپر همه‌منظوره (Omni Scraper Graph)

این مثال نشان می‌دهد چگونه می‌توان از Scrapegraph-ai برای اسکرپینگ همه‌منظورهٔ وب در قالب‌های مختلف داده استفاده کرد.

## قابلیت‌ها

- استخراج دادهٔ چندقالبی (JSON، XML، HTML، CSV)
- تشخیص خودکار قالب
- خروجی یکپارچهٔ داده
- تبدیل محتوا

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import OmniScraperGraph

graph = OmniScraperGraph()
data = graph.scrape("https://example.com/data")
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
