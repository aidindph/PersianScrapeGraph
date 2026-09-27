"""
نمونهٔ پایهٔ پایپ‌لاین اسکرپینگ با SmartScraperGraph و پرومپت فارسی

این اسکریپت مانند examples/smart_scraper_graph/ollama/smart_scraper_ollama.py است،
با این تفاوت که پرومپت آن به زبان فارسی است و از Ollama به‌عنوان LLM محلی استفاده می‌کند.
"""

from scrapegraphai.graphs import SmartScraperGraph
from scrapegraphai.utils import prettify_exec_info

# ************************************************
# تعریف پیکربندی گراف
# ************************************************

graph_config = {
    "llm": {
        "model": "ollama/llama3.2",
        "temperature": 0,
        "base_url": "http://localhost:11434",  # نشانی سرویس Ollama
        "model_tokens": 4096,
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
print(result)

# ************************************************
# نمایش اطلاعات اجرای گراف
# ************************************************

graph_exec_info = smart_scraper_graph.get_execution_info()
print(prettify_exec_info(graph_exec_info))
