# مثال گراف اسکرپر XML (XML Scraper Graph)

این مثال نشان می‌دهد چگونه می‌توان با Scrapegraph-ai دادهٔ XML را از منابع وب استخراج و پردازش کرد.

## قابلیت‌ها

- استخراج دادهٔ XML
- پرس‌وجو با XPath
- تبدیل داده
- اعتبارسنجی اسکیما (schema validation)

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import XmlScraperGraph

graph = XmlScraperGraph()
xml_data = graph.scrape("https://example.com/feed.xml")
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
