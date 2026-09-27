# مثال‌های Smart Scraper با ScrapeGraph AI

این ریپازیتوری حاوی مثال‌هایی است که نشان می‌دهند چگونه می‌توان با استفاده از قابلیت‌های قدرتمند اسکرپینگ ScrapeGraph AI و به‌کمک پرومپت‌های زبان طبیعی، وب‌سایت‌ها را به دادهٔ ساخت‌یافته تبدیل کرد.

## دربارهٔ ScrapeGraph AI

[ScrapeGraph AI](https://scrapegraphai.com) یک API قدرتمند اسکرپینگ است که هر وب‌سایتی را به دادهٔ ساخت‌یافته برای عامل‌های هوش مصنوعی و تحلیل‌ها تبدیل می‌کند. این سرویس مخصوص عامل‌های هوش مصنوعی و LLMها ساخته شده و از دستورالعمل‌های زبان طبیعی و خروجی JSON ساخت‌یافته پشتیبانی می‌کند.

ویژگی‌های کلیدی:
- استخراج داده از هر وب‌سایتی، به‌صورت همه‌منظوره
- پردازش هوشمند با هوش مصنوعی پیشرفته
- راه‌اندازی بسیار سریع با SDKهای رسمی
- آمادهٔ استفاده در سطح سازمانی با چرخش خودکار پروکسی
- یکپارچه‌سازی روان با سیستم‌های RAG

## مثال‌های موجود

### ۱. Smart Scraper
مثال `smartscraper_scrapegraphai.py` نشان می‌دهد چگونه می‌توان با پرومپت‌های زبان طبیعی، دادهٔ ساخت‌یافته از یک وب‌سایت واحد استخراج کرد.

### ۲. Search Scraper
مثال `searchscraper_scrapegraphai.py` نشان می‌دهد چگونه:
- در اینترنت به‌دنبال اطلاعات مرتبط جست‌وجو کنیم
- از چند منبع دادهٔ ساخت‌یافته استخراج کنیم
- اطلاعات وب‌سایت‌های مختلف را ادغام و تحلیل کنیم
- به پرس‌و‌جوهای پیچیده پاسخ جامع بگیریم

## پیش‌نیازها

- پایتون ۳.۷ به بالا
- pip (مدیر بستهٔ پایتون)

## نصب

1. ریپازیتوری را clone کنید:
```bash
git clone https://github.com/yourusername/Scrapegraph-ai.git
cd Scrapegraph-ai
```

2. وابستگی‌های مورد نیاز را نصب کنید:
```bash
pip install -r requirements.txt
```

3. در پوشهٔ `examples/smart_scraper_graph` یک فایل `.env` با این محتوا بسازید:
```env
SCRAPEGRAPH_API_KEY=your-api-key-here
```

## نحوهٔ استفاده

### مثال Smart Scraper
```bash
python smartscraper_scrapegraphai.py
```

### مثال Search Scraper
```bash
python searchscraper_scrapegraphai.py
```

## نمونه خروجی‌ها

### خروجی Smart Scraper
```python
Request ID: abc123...
Result: {
    "founders": [
        {
            "name": "Marco Vinciguerra",
            "role": "Founder & Software Engineer",
            "bio": "LinkedIn profile of Marco Vinciguerra"
        },
        {
            "name": "Lorenzo Padoan",
            "role": "Founder & CEO",
            "bio": "LinkedIn profile of Lorenzo Padoan"
        }
    ]
}
Reference URLs: ["https://scrapegraphai.com/about"]
```

### خروجی Search Scraper
```python
Request ID: xyz789...
Number of sources processed: 3

Extracted Information:
{
    "features": [
        "Universal data extraction",
        "Intelligent processing with AI",
        "Lightning-fast setup",
        "Enterprise-ready with proxy rotation"
    ],
    "benefits": [
        "Perfect for AI agents and LLMs",
        "Natural language instructions",
        "Structured JSON output",
        "Seamless RAG integration"
    ]
}

Sources:
1. https://scrapegraphai.com
2. https://scrapegraphai.com/features
3. https://scrapegraphai.com/docs
```

## قابلیت‌های نمایش‌داده‌شده

- پیکربندی از طریق متغیرهای محیطی
- راه‌اندازی کلاینت API
- اسکرپینگ هوشمند با پرومپت‌های زبان طبیعی
- اسکرپینگ مبتنی بر جست‌وجو در چند منبع
- مدیریت خطا و پردازش پاسخ
- مدیریت امن اطلاعات حساس

## قیمت‌گذاری و اعتبار

Scrapegraph AI پلن‌های قیمتی مختلفی دارد:
- رایگان: ۵۰ اعتبار همراه
- Starter: ۲۰ دلار در ماه، ۵٬۰۰۰ اعتبار
- Growth: ۱۰۰ دلار در ماه، ۴۰٬۰۰۰ اعتبار
- Pro: ۵۰۰ دلار در ماه، ۲۵۰٬۰۰۰ اعتبار
- سازمانی (Enterprise): راه‌حل‌های سفارشی

هزینهٔ سرویس‌ها:
- Smart Scraper: ۱۰ اعتبار به‌ازای هر صفحهٔ وب
- Search Scraper: ۳۰ اعتبار به‌ازای هر پرس‌وجو

## پشتیبانی و منابع

- [مستندات رسمی](https://scrapegraphai.com/docs)
- [وضعیت API](https://scrapegraphai.com/status)
- تماس: contact@scrapegraphai.com

## نکات امنیتی

- هرگز فایل `.env` خود را در سیستم کنترل نسخه کامیت نکنید
- کلید API خود را امن نگه دارید
- برای اطلاعات حساس از متغیرهای محیطی استفاده کنید

## مجوز

این مثال با همان مجوز ScrapeGraph AI ارائه شده است. برای اطلاعات بیشتر [شرایط استفاده از سرویس](https://scrapegraphai.com/terms) را ببینید.
