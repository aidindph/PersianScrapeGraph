# مثال گراف اسکرپر اسناد (Document Scraper Graph)

این مثال نشان می‌دهد چگونه می‌توان با Scrapegraph-ai از قالب‌های مختلف سند (PDF، DOC، DOCX و غیره) داده استخراج کرد.

## قابلیت‌ها

- پشتیبانی از اسناد چندقالبی
- استخراج متن
- تجزیهٔ اسناد
- استخراج فراداده (metadata)

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import DocumentScraperGraph

graph = DocumentScraperGraph()
content = graph.scrape("document.pdf")
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
