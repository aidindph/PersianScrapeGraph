# مثال گراف Markdownify

این مثال نشان می‌دهد چگونه می‌توان با گراف Markdownify، محتوای HTML را به قالب Markdown تبدیل کرد.

## قابلیت‌ها

- تبدیل محتوای HTML به Markdownِ تمیز و خوانا
- پشتیبانی از هر دو نوع ورودی URL و HTML مستقیم
- حفظ قالب‌بندی و ساختار محتوای اصلی
- مدیریت عناصر پیچیدهٔ HTML و ساختارهای تو در تو

## نحوهٔ استفاده

```python
from scrapegraphai import Client
from scrapegraphai.logger import sgai_logger

# Set up logging
sgai_logger.set_logging(level="INFO")

# Initialize the client
sgai_client = Client(api_key="your-api-key")

# Example 1: Convert a website to Markdown
response = sgai_client.markdownify(
    website_url="https://example.com"
)
print(response.markdown)

# Example 2: Convert HTML content directly
html_content = """
<div>
    <h1>Hello World</h1>
    <p>This is a <strong>test</strong> paragraph.</p>
</div>
"""
response = sgai_client.markdownify(
    html_content=html_content
)
print(response.markdown)
```

## پارامترها

متد `markdownify` پارامترهای زیر را می‌پذیرد:

- `website_url` (str، اختیاری): URL وب‌سایتی که باید به Markdown تبدیل شود
- `html_content` (str، اختیاری): محتوای HTML مستقیم برای تبدیل به Markdown

نکته: باید یا `website_url` و یا `html_content` را بدهید، نه هر دو.

## پاسخ (Response)

شیء پاسخ شامل این موارد است:

- `markdown` (str): محتوای Markdown تبدیل‌شده
- `metadata` (dict): اطلاعات تکمیلی دربارهٔ فرایند تبدیل

## مدیریت خطا

این گراف موارد مرزی مختلفی را مدیریت می‌کند:

- URLهای نامعتبر
- HTML بدشکل
- خطاهای شبکه
- مشکلات timeout

اگر خطایی رخ دهد، ثبت (log) می‌شود و همراه با پیام خطای مناسب raise می‌شود.

## بهترین شیوه‌ها

1. همیشه یک URL معتبر یا محتوای HTMLِ خوش‌ساخت ارائه دهید
2. برای اشکال‌زدایی از سطوح مناسب logging استفاده کنید
3. پاسخ را در برنامهٔ خود به‌درستی مدیریت کنید
4. برای تبدیل‌های در مقیاس بزرگ، محدودیت نرخ درخواست (rate limiting) را در نظر بگیرید
