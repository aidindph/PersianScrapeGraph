"""
نمونهٔ پایهٔ پایپ‌لاین اسکرپینگ با SmartScraperGraph و پرومپت فارسی

این اسکریپت مانند examples/smart_scraper_graph/openai/smart_scraper_openai.py است،
با این تفاوت که پرومپت آن به زبان فارسی است و از مدل gpt-4o-mini شرکت OpenAI استفاده می‌کند.
"""

import json
import os

from dotenv import load_dotenv

from scrapegraphai.graphs import SmartScraperGraph
from scrapegraphai.utils import prettify_exec_info

# خواندن کلید API از متغیرهای محیطی (فایل .env)
load_dotenv()

# ************************************************
# تعریف پیکربندی گراف
# ************************************************


graph_config = {
    "llm": {
        "api_key": os.getenv("OPENAI_APIKEY"),
        "model": "openai/gpt-4o-mini",
    },
    "verbose": True,
    "headless": False,
}

# ************************************************
# ساخت نمونهٔ SmartScraperGraph و اجرای آن
# ************************************************

smart_scraper_graph = SmartScraperGraph(
    prompt="فهرست کتاب‌ها را با عنوان، قیمت و امتیاز استخراج کن",
    source="https://books.toscrape.com/",
    config=graph_config,
)

result = smart_scraper_graph.run()
print(json.dumps(result, indent=4, ensure_ascii=False))

# ************************************************
# نمایش اطلاعات اجرای گراف
# ************************************************

graph_exec_info = smart_scraper_graph.get_execution_info()
print(prettify_exec_info(graph_exec_info))
