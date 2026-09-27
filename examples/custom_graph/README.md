# مثال گراف سفارشی (Custom Graph)

این مثال نشان می‌دهد چگونه می‌توان با استفاده از Scrapegraph-ai گراف‌های سفارشی ساخت و پیاده‌سازی کرد.

## قابلیت‌ها

- ساخت node سفارشی
- سفارشی‌سازی گراف
- پیکربندی پایپ‌لاین
- پردازش سفارشی داده

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import CustomGraph

graph = CustomGraph()
graph.add_node("custom_node", CustomNode())
results = graph.process()
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
