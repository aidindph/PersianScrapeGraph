# مثال گراف جست‌وجوی عمیق (Depth Search Graph)

این مثال نشان می‌دهد چگونه می‌توان از Scrapegraph-ai برای پیمایش عمیق وب و کاوش محتوا استفاده کرد.

## قابلیت‌ها

- پیمایش عمیق وب
- کشف محتوا
- تحلیل لینک‌ها
- جست‌وجوی بازگشتی

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import DepthSearchGraph

graph = DepthSearchGraph()
results = graph.search("https://example.com", depth=3)
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
