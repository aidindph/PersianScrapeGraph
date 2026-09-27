# مثال گراف تولیدکنندهٔ اسکریپت (Script Generator Graph)

این مثال نشان می‌دهد چگونه می‌توان با Scrapegraph-ai بر اساس تحلیل داده، اسکریپت‌های خودکارسازی تولید کرد.

## قابلیت‌ها

- تولید خودکار اسکریپت
- خودکارسازی وظایف
- بهینه‌سازی کد
- پشتیبانی از چند زبان

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import ScriptGeneratorGraph

graph = ScriptGeneratorGraph()
script = graph.generate("task description")
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
