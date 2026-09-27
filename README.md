<p align="center">
  <a href="https://parsnest.com" target="_blank" title="آشیانه پارس — طراحی سایت و طراحی نرم‌افزار">
    <img src="media/parsnest-logo.png" alt="لوگوی آشیانه پارس — توسعه‌دهنده فارسی و توسعه‌دهنده UI پروژه" width="320">
  </a>
</p>

> [!NOTE]
> **🤝 توسعه‌دهنده فارسی و توسعه‌دهنده UI این پروژه: [آشیانه پارس](https://parsnest.com)** — مجری تخصصی [طراحی سایت](https://parsnest.com) و [طراحی نرم‌افزار](https://parsnest.com)
>
> کارهای انجام‌شده توسط آشیانه پارس در این پروژه: ترجمهٔ کامل پروژه به فارسی 🇮🇷 · طراحی و توسعهٔ رابط کاربری راست‌چین با فونت **ایران‌یکان** و **تقویم جلالی** · داشبورد وب آمادهٔ استقرار روی **Vercel** · بومی‌سازی مستندات و مثال‌های فارسی.

> [!IMPORTANT]
> **🇮🇷 PersianScrapeGraph** — این ریپو یک کلون توسعه‌یافته از [ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai) است (مجوز MIT و حقوق نویسندگان اصلی محفوظ است).
> 📌 **قانون ریپو:** تمام کامیت‌ها و پوش‌ها باید به نام **Aidin Ghassemi** باشند — جزئیات و اجرای خودکار در [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🚀 **به‌دنبال راهی حتی سریع‌تر و ساده‌تر برای اسکرپینگ در مقیاس بزرگ هستید (فقط ۵ خط کد)؟** نسخهٔ ارتقایافتهٔ ما را در [**ScrapeGraphAI.com**](https://scrapegraphai.com/?utm_source=github&utm_medium=readme&utm_campaign=oss_cta&ut#m_content=top_banner) ببینید! 🚀

---

# 🕷️ ScrapeGraphAI: فقط یک‌بار اسکرپ کنید

<p align="center">
  <a href="https://scrapegraphai.com">
    <img src="media/banner.png" alt="ScrapeGraphAI" style="width: 100%;">
  </a>
</p>

[English](docs/english.md) | [فارسی](README.md) | [中文](docs/chinese.md) | [日本語](docs/japanese.md)
| [한국어](docs/korean.md)
| [Русский](docs/russian.md) | [Türkçe](docs/turkish.md)
| [Deutsch](docs/german.md)
| [Español](docs/spanish.md)
| [français](docs/french.md)
| [Português](docs/portuguese.md)
| [Italiano](docs/italian.md)

[![PyPI Downloads](https://static.pepy.tech/personalized-badge/scrapegraphai?period=total&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads)](https://pepy.tech/projects/scrapegraphai)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![](https://dcbadge.vercel.app/api/server/gkxQDAjfeX)](https://discord.gg/gkxQDAjfeX)

<p align="center">
<a href="https://trendshift.io/repositories/15078" target="_blank"><img src="https://trendshift.io/api/badge/repositories/15078" alt="ScrapeGraphAI%2FScrapegraph-ai | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
<p align="center">

[ScrapeGraphAI](https://scrapegraphai.com) یک کتابخانهٔ پایتونی برای **وب‌اسکرپینگ** (استخراج داده از وب) است که با استفاده از LLM و منطق مستقیم گراف (direct graph logic)، پایپ‌لاین‌های اسکرپینگ برای وب‌سایت‌ها و اسناد محلی (XML، HTML، JSON، Markdown و غیره) می‌سازد.

فقط بگویید چه اطلاعاتی را می‌خواهید استخراج کنید؛ کتابخانه بقیهٔ کار را برایتان انجام می‌دهد!

## 🏗️ ساختار این فورک

این ریپو علاوه بر خود کتابخانه، یک **محصول کامل و آمادهٔ استقرار** هم دارد:

```text
PersianScrapeGraph/
├── scrapegraphai/         # کتابخانهٔ اصلی (موتور اسکرپینگ با LLM)
├── webui/                 # داشبورد وب فارسی — Next.js 16، راست‌چین، فونت ایران‌یکان، تقویم جلالی
├── api-service/           # سرویس API موتور استخراج — FastAPI + Docker
├── examples/persian/      # نمونه‌های استفاده با پرومپت فارسی
└── docs/deploy-vercel.md  # راهنمای گام‌به‌گام استقرار روی Vercel
```

- 🖥️ **داشبورد وب فارسی** (`webui/`): رابط کاربری کامل راست‌چین با فونت **ایران‌یکان**، **تقویم جلالی**، تاریخچهٔ استخراج و موتور دمو — آمادهٔ استقرار روی **Vercel** (راهنما: [docs/deploy-vercel.md](docs/deploy-vercel.md)).
- ⚙️ **سرویس موتور** (`api-service/`): گراف کامل ScrapeGraphAI پشت یک REST API برای استقرار کامل روی Railway / Render / Fly.io / سرور شخصی.
- 🇮🇷 **بومی‌سازی فارسی**: تمام مستندات، مثال‌ها و رابط کاربری فارسی شده‌اند؛ پرومپت‌های فارسی هم در `examples/persian/` آماده است.
- 📏 **قانون ریپو**: تمام کامیت‌ها باید به نام **Aidin Ghassemi** باشند — به‌صورت خودکار در لوکال (pre-commit) و روی GitHub (CI) اعمال می‌شود؛ جزئیات در [CONTRIBUTING.md](CONTRIBUTING.md).

## 🚀 یکپارچه‌سازی‌ها
ScrapeGraphAI با فریم‌ورک‌ها و ابزارهای محبوب، یکپارچه‌سازی روانی دارد تا توانایی‌های اسکرپینگ شما را تقویت کند. چه با پایتون یا Node.js توسعه می‌دهید، چه از فریم‌ورک‌های LLM استفاده می‌کنید و چه با پلتفرم‌های بدون کد (no-code) کار می‌کنید، گزینه‌های جامعی برای یکپارچه‌سازی در اختیارتان است.

<p align="center">
  <a href="https://scrapegraphai.com">
    <img src="https://raw.githubusercontent.com/ScrapeGraphAI/.github/main/profile/assets/api_banner.png" alt="Web data extraction at scale? Try ScrapeGraphAI cloud" style="width: 100%;">
  </a>
</p>

اطلاعات بیشتر را می‌توانید از این [لینک](https://scrapegraphai.com) دنبال کنید.

**یکپارچه‌سازی‌ها**:
- **API**: [مستندات](https://docs.scrapegraphai.com/introduction)
- **SDKها**: [Python](https://docs.scrapegraphai.com/sdks/python)، [Node](https://docs.scrapegraphai.com/sdks/javascript)
- **فریم‌ورک‌های LLM**: [Langchain](https://docs.scrapegraphai.com/integrations/langchain)، [Llama Index](https://docs.scrapegraphai.com/integrations/llamaindex)، [Crew.ai](https://docs.scrapegraphai.com/integrations/crewai)، [Agno](https://docs.scrapegraphai.com/integrations/agno)، [CamelAI](https://github.com/camel-ai/camel)
- **فریم‌ورک‌های کم‌کد (Low-code)**: [Pipedream](https://pipedream.com/apps/scrapegraphai)، [Bubble](https://bubble.io/plugin/scrapegraphai-1745408893195x213542371433906180)، [Zapier](https://zapier.com/apps/scrapegraphai/integrations)، [n8n](http://localhost:5001/dashboard)، [Dify](https://dify.ai)، [Toolhouse](https://app.toolhouse.ai/mcp-servers/scrapegraph_smartscraper)
- **سرور MCP**: [لینک](https://smithery.ai/server/@ScrapeGraphAI/scrapegraph-mcp)


## 🚀 نصب سریع

صفحهٔ مرجع Scrapegraph-ai در صفحهٔ رسمی PyPI در دسترس است: [pypi](https://pypi.org/project/scrapegraphai/).

```bash
pip install scrapegraphai

# IMPORTANT (for fetching websites content)
playwright install
```

**نکته:** توصیه می‌شود کتابخانه را داخل یک محیط مجازی (virtual environment) نصب کنید تا با سایر کتابخانه‌ها تداخلی پیش نیاید 🐱


## 💻 نحوهٔ استفاده
چند پایپ‌لاین استاندارد برای استخراج اطلاعات از یک وب‌سایت (یا فایل محلی) وجود دارد.

رایج‌ترین آن‌ها `SmartScraperGraph` است که با گرفتن یک پرومپت از کاربر و یک URL منبع، اطلاعات را از یک صفحهٔ واحد استخراج می‌کند.


```python
from scrapegraphai.graphs import SmartScraperGraph

# Define the configuration for the scraping pipeline
graph_config = {
    "llm": {
        "model": "ollama/llama3.2",
        "model_tokens": 8192,
        "format": "json",
    },
    "verbose": True,
    "headless": False,
}

# Create the SmartScraperGraph instance
smart_scraper_graph = SmartScraperGraph(
    prompt="Extract useful information from the webpage, including a description of what the company does, founders and social media links",
    source="https://scrapegraphai.com/",
    config=graph_config
)

# Run the pipeline
result = smart_scraper_graph.run()

import json
print(json.dumps(result, indent=4))
```

> [!NOTE]
> برای OpenAI و سایر مدل‌ها فقط کافی است تنظیمات llm را تغییر دهید!
> ```python
>graph_config = {
>    "llm": {
>        "api_key": "YOUR_OPENAI_API_KEY",
>        "model": "openai/gpt-4o-mini",
>    },
>    "verbose": True,
>    "headless": False,
>}
>```
>


خروجی یک دیکشنری مانند زیر خواهد بود:

```python
{
    "description": "ScrapeGraphAI transforms websites into clean, organized data for AI agents and data analytics. It offers an AI-powered API for effortless and cost-effective data extraction.",
    "founders": [
        {
            "name": "",
            "role": "Founder & Technical Lead",
            "linkedin": "https://www.linkedin.com/in/perinim/"
        },
        {
            "name": "Marco Vinciguerra",
            "role": "Founder & Software Engineer",
            "linkedin": "https://www.linkedin.com/in/marco-vinciguerra-7ba365242/"
        },
        {
            "name": "Lorenzo Padoan",
            "role": "Founder & Product Engineer",
            "linkedin": "https://www.linkedin.com/in/lorenzo-padoan-4521a2154/"
        }
    ],
    "social_media_links": {
        "linkedin": "https://www.linkedin.com/company/101881123",
        "twitter": "https://x.com/scrapegraphai",
        "github": "https://github.com/ScrapeGraphAI/Scrapegraph-ai"
    }
}
```
پایپ‌لاین‌های دیگری نیز وجود دارند که می‌توانند از چند صفحه اطلاعات استخراج کنند، اسکریپت پایتون تولید کنند یا حتی فایل صوتی بسازند.

| نام پایپ‌لاین         | توضیحات                                                                                                        |
|-------------------------|------------------------------------------------------------------------------------------------------------------|
| SmartScraperGraph       | اسکرپر تک‌صفحه‌ای که فقط به یک پرومپت کاربر و یک منبع ورودی نیاز دارد.                                            |
| SearchGraph             | اسکرپر چندصفحه‌ای که اطلاعات را از n نتیجهٔ برتر یک موتور جست‌وجو استخراج می‌کند.                                  |
| SpeechGraph             | اسکرپر تک‌صفحه‌ای که اطلاعات را از وب‌سایت استخراج کرده و یک فایل صوتی تولید می‌کند.                              |
| ScriptCreatorGraph      | اسکرپر تک‌صفحه‌ای که اطلاعات را از وب‌سایت استخراج کرده و یک اسکریپت پایتون تولید می‌کند.                         |
| SmartScraperMultiGraph  | اسکرپر چندصفحه‌ای که با یک پرومپت واحد و فهرستی از منابع، از چند صفحه اطلاعات استخراج می‌کند.                      |
| ScriptCreatorMultiGraph | اسکرپر چندصفحه‌ای که برای استخراج اطلاعات از چند صفحه و منبع، یک اسکریپت پایتون تولید می‌کند.                     |

برای هر یک از این گراف‌ها نسخهٔ multi نیز وجود دارد که امکان فراخوانی موازی LLM را فراهم می‌کند.

می‌توانید از LLMهای مختلف از طریق API استفاده کنید؛ مانند **OpenAI**، **Groq**، **Azure**، **Gemini**، **[MiniMax](docs/minimax.md)** و موارد دیگر، یا از مدل‌های محلی با **Ollama** بهره ببرید.

اگر می‌خواهید از مدل‌های محلی استفاده کنید، به یاد داشته باشید که [Ollama](https://ollama.com/) را نصب کرده و مدل‌ها را با دستور **ollama pull** دانلود کنید.


## 📖 مستندات

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1sEZBonBMGP44CtO6GQTwAlL0BGJXjtfd?usp=sharing)

مستندات ScrapeGraphAI را می‌توانید [اینجا](https://docs.scrapegraphai.com/introduction) بیابید.
## 🆚 نسخهٔ متن‌باز در برابر API مدیریت‌شده

ScrapeGraphAI در دو نسخه ارائه می‌شود: **این کتابخانهٔ متن‌باز** که آن را خودتان اجرا می‌کنید، و **API ابری مدیریت‌شده** (که از طریق SDKهای [Python](https://github.com/ScrapeGraphAI/scrapegraph-py) و [JS/TS](https://github.com/ScrapeGraphAI/scrapegraph-js) استفاده می‌شود). جدول زیر تفاوت آن‌ها را توضیح می‌دهد تا گزینهٔ مناسب خود را انتخاب کنید.

| | متن‌باز (`scrapegraphai`) | API مدیریت‌شده (`scrapegraph-py` / `scrapegraph-js`) |
|---|---|---|
| **چیست؟** | یک کتابخانهٔ پایتونی که خودتان اجرا می‌کنید | یک سرویس ابری میزبانی‌شده که از طریق SDK فراخوانی می‌شود |
| **کجا اجرا می‌شود** | زیرساخت خودتان (self-hosted) | ابر ScrapeGraphAI |
| **LLM** | مدل خودتان را بیاورید (OpenAI، Groq، Gemini، Azure، مدل محلی با Ollama) | به‌صورت مدیریت‌شده |
| **مرورگر / رندر JS** | خودتان پیکربندی می‌کنید (Playwright) | مدیریت‌شده (حالت‌های stealth و `auto`/`fast`/`js`) |
| **پروکسی و ضدربات** | مسئولیتش با شماست | شامل می‌شود |
| **مقیاس‌پذیری و نگهداری** | مسئولیتش با شماست | کاملاً مدیریت‌شده |
| **مدل هزینه** | توکن‌های LLM + زیرساخت خودتان | اعتباری و به‌مصرف (pay-as-you-go) |
| **احراز هویت** | کلیدهای LLM خودتان | `SGAI_API_KEY` |
| **قابلیت‌ها** | پایپ‌لاین‌های گرافی (SmartScraper، Search، Speech، ScriptCreator…) | Scrape، Extract، Search، Crawl، Monitor، History |
| **میزان زحمت راه‌اندازی** | پیکربندی بیشتر | حداقلی — یک کلید API و یک فراخوانی |
| **مجوز** | MIT | SDK با مجوز MIT ارائه می‌شود؛ سرویس API پرداختی است |

**کتابخانهٔ متن‌باز را انتخاب کنید** اگر کنترل کامل، داده‌های روی‌پریم/خودمیزبان، LLMهای محلی (Ollama) یا تنظیم دقیق هزینه را می‌خواهید — و راضی هستید مدیریت مرورگر، پروکسی و مقیاس‌پذیری را خودتان به عهده بگیرید.

**API مدیریت‌شده را انتخاب کنید** اگر هیچ زیرساختی نمی‌خواهید، رندر JS و ضدرباتِ مدیریت‌شده، قابلیت‌های داخلی **Crawl** و کارهای زمان‌بندی‌شدهٔ **Monitor** و سریع‌ترین مسیر رسیدن به محیط عملیاتی را می‌خواهید — با پرداخت به‌ازای اعتبار.

- کتابخانهٔ متن‌باز: https://github.com/ScrapeGraphAI/Scrapegraph-ai
- SDK پایتون: https://github.com/ScrapeGraphAI/scrapegraph-py
- SDK زبان JS/TS: https://github.com/ScrapeGraphAI/scrapegraph-js
- مستندات API: https://docs.scrapegraphai.com/introduction

## 🏆 حامیان

[![NodeMaven](docs/assets/nodemaven-banner.png)](https://go.nodemaven.com/scrapegraphyai)

کدهای تخفیف مخصوص کاربران ScrapeGraphAI: `SCRAPEGRAPH35` (۳۵٪ تخفیف روی پروکسی‌های موبایل و رزیدنشیال)، `SCRAPEGRAPH40` (۴۰٪ تخفیف روی پروکسی‌های ISP / استاتیک).

## 🤝 مشارکت

برای مشارکت خوش‌آمد می‌گوییم؛ به سرور Discord ما بپیوندید تا دربارهٔ بهبودها گفت‌وگو کنیم و پیشنهادهایتان را با ما در میان بگذارید!

لطفاً [راهنمای مشارکت](https://github.com/ScrapeGraphAI/Scrapegraph-ai/blob/main/CONTRIBUTING.md) را ببینید.

[![My Skills](https://skillicons.dev/icons?i=discord)](https://discord.gg/uJN7TYcpNa)
[![My Skills](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/company/scrapegraphai/)
[![My Skills](https://skillicons.dev/icons?i=twitter)](https://twitter.com/scrapegraphai)

## 🔗 ScrapeGraph API و SDKها
اگر به‌دنبال راه‌حل سریعی برای یکپارچه‌سازی ScrapeGraph در سیستم خود هستید، API قدرتمند ما را [اینجا](https://scrapegraphai.com) ببینید!

[![API Banner](https://raw.githubusercontent.com/ScrapeGraphAI/Scrapegraph-ai/main/docs/assets/api_banner.png)](https://scrapegraphai.com)

ما هم SDK پایتون و هم Node.js ارائه می‌دهیم تا یکپارچه‌سازی در پروژه‌هایتان آسان شود. آن‌ها را در زیر ببینید:

| SDK       | زبان    | لینک GitHub                                                                 |
|-----------|----------|-----------------------------------------------------------------------------|
| SDK پایتون | Python   | [scrapegraph-py](https://docs.scrapegraphai.com/sdks/python) |
| SDK Node.js | Node.js  | [scrapegraph-js](https://docs.scrapegraphai.com/sdks/javascript) |

مستندات رسمی API را می‌توانید [اینجا](https://docs.scrapegraphai.com/introduction) بیابید.

## 📈 تله‌متری
ما متریک‌های استفادهٔ ناشناس جمع‌آوری می‌کنیم تا کیفیت پکیج و تجربهٔ کاربری آن را ارتقا دهیم. این داده‌ها به ما کمک می‌کند اولویت بهبودها را مشخص کنیم و سازگاری را تضمین کنیم. اگر می‌خواهید آن را غیرفعال کنید، متغیر محیطی SCRAPEGRAPHAI_TELEMETRY_ENABLED=false را تنظیم کنید. برای اطلاعات بیشتر به مستندات [اینجا](https://docs.scrapegraphai.com/introduction) مراجعه کنید.

## ❤️ مشارکت‌کنندگان
[![Contributors](https://contrib.rocks/image?repo=ScrapeGraphAI/Scrapegraph-ai)](https://github.com/ScrapeGraphAI/Scrapegraph-ai/graphs/contributors)

## 🎓 استناد
اگر از این کتابخانه برای مقاصد پژوهشی استفاده کرده‌اید، لطفاً با مرجع زیر به ما استناد کنید:
```text
  @misc{scrapegraph-ai,
    author = {Lorenzo Padoan, Marco Vinciguerra},
    title = {Scrapegraph-ai},
    year = {2024},
    url = {https://github.com/ScrapeGraphAI/Scrapegraph-ai},
    note = {A Python library for scraping leveraging large language models}
  }
```
## نویسندگان

|                    | اطلاعات تماس         |
|--------------------|----------------------|
| Marco Vinciguerra  | [![Linkedin Badge](https://img.shields.io/badge/-Linkedin-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/marco-vinciguerra-7ba365242/)    |
| Lorenzo Padoan     | [![Linkedin Badge](https://img.shields.io/badge/-Linkedin-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/lorenzo-padoan-4521a2154/)  |

## 📜 مجوز

ScrapeGraphAI تحت مجوز MIT منتشر شده است. برای اطلاعات بیشتر، فایل [LICENSE](https://github.com/ScrapeGraphAI/Scrapegraph-ai/blob/main/LICENSE) را ببینید.

## قدردانی‌ها

- از همهٔ مشارکت‌کنندگان پروژه و جامعهٔ متن‌باز برای حمایت‌شان سپاسگزاریم.
- ScrapeGraphAI فقط برای مقاصد اکتشاف داده و پژوهش در نظر گرفته شده است. ما مسئولیت هیچ‌گونه سوءاستفاده از این کتابخانه را نمی‌پذیریم.

ساخته‌شده با ❤️ توسط [ScrapeGraph AI](https://scrapegraphai.com)

[Scarf tracking](https://static.scarf.sh/a.png?x-pxid=102d4b8c-cd6a-4b9e-9a16-d6d141b9212d)
