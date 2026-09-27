# مثال گراف جست‌وجو (Search Graph)

این مثال نشان می‌دهد چگونه می‌توان با Scrapegraph-ai یک گراف جست‌وجو برای بازیابی و تحلیل محتوای وب پیاده‌سازی کرد.

## قابلیت‌ها

- یکپارچه‌سازی با جست‌وجوی وب
- امتیازدهی به ارتباط محتوا
- پالایش نتایج
- تجمیع داده

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import SearchGraph

graph = SearchGraph()
results = graph.search("your search query")
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
- `SERP_API_KEY`: کلید API سرویس SERP شما (اختیاری)
