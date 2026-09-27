# مثال گراف تولیدکنندهٔ کد (Code Generator Graph)

این مثال نشان می‌دهد چگونه می‌توان با Scrapegraph-ai بر اساس مشخصات و نیازمندی‌ها کد تولید کرد.

## قابلیت‌ها

- تولید کد از مشخصات (specifications)
- پشتیبانی از چند زبان برنامه‌نویسی
- مستندسازی کد
- پیاده‌سازی بهترین شیوه‌ها

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import CodeGeneratorGraph

graph = CodeGeneratorGraph()
code = graph.generate("code specification")
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
