# پیکربندی Timeout برای FetchNode

## نمای کلی

`FetchNode` در ScrapeGraphAI از timeoutهای قابل‌پیکربندی برای همهٔ عملیات مسدودکننده (blocking) پشتیبانی می‌کند تا هنگام دریافت محتوای وب یا تجزیهٔ فایل‌ها، برنامه برای همیشه متوقف نشود. این قابلیت به شما امکان می‌دهد سقف زمان اجرا را برای موارد زیر کنترل کنید:

- درخواست‌های HTTP (هنگام استفاده از `use_soup=True`)
- تجزیهٔ فایلهای PDF
- عملیات ChromiumLoader

## پیکربندی

### رفتار پیش‌فرض

به‌طور پیش‌فرض، `FetchNode` برای همهٔ عملیات مسدودکننده از **timeout ۳۰ ثانیه‌ای** استفاده می‌کند، به‌شرطی که یک `node_config` داده باشید:

```python
from scrapegraphai.nodes import FetchNode

# Default 30-second timeout
node = FetchNode(
    input="url",
    output=["doc"],
    node_config={}
)
```

### timeout سفارشی

می‌توانید مقدار سفارشی timeout (به ثانیه) را از طریق پارامتر `timeout` تعیین کنید:

```python
# Custom 10-second timeout
node = FetchNode(
    input="url",
    output=["doc"],
    node_config={"timeout": 10}
)
```

### غیرفعال‌کردن timeout

برای غیرفعال‌کردن timeout و اجازهٔ اجرای نامحدود عملیات، مقدار `timeout` را `None` بگذارید:

```python
# No timeout - operations will wait indefinitely
node = FetchNode(
    input="url",
    output=["doc"],
    node_config={"timeout": None}
)
```

### بدون پیکربندی

اگر هیچ `node_config` ارائه نکنید، timeout به‌طور پیش‌فرض `None` است (بدون timeout):

```python
# No timeout (backward compatible)
node = FetchNode(
    input="url",
    output=["doc"],
    node_config=None
)
```

## موارد کاربرد

### درخواست‌های HTTP

وقتی `use_soup=True` باشد، timeout روی فراخوانی‌های `requests.get()` اعمال می‌شود:

```python
node = FetchNode(
    input="url",
    output=["doc"],
    node_config={
        "use_soup": True,
        "timeout": 15  # HTTP request will timeout after 15 seconds
    }
)

state = {"url": "https://example.com"}
result = node.execute(state)
```

اگر timeout برابر `None` باشد، هیچ پارامتر timeoutی به `requests.get()` پاس داده نمی‌شود:

```python
node = FetchNode(
    input="url",
    output=["doc"],
    node_config={
        "use_soup": True,
        "timeout": None  # No timeout for HTTP requests
    }
)
```

### تجزیهٔ PDF

timeout روی عملیات تجزیهٔ فایلهای PDF با `PyPDFLoader` اعمال می‌شود:

```python
node = FetchNode(
    input="pdf",
    output=["doc"],
    node_config={
        "timeout": 60  # PDF parsing will timeout after 60 seconds
    }
)

state = {"pdf": "/path/to/large_document.pdf"}
try:
    result = node.execute(state)
except TimeoutError as e:
    print(f"PDF parsing took too long: {e}")
```

اگر تجزیه از timeout فراتر رود، یک `TimeoutError` با پیامی توصیفی raise می‌شود:

```
TimeoutError: PDF parsing exceeded timeout of 60 seconds
```

### ChromiumLoader

timeout به‌طور خودکار از طریق `loader_kwargs` به `ChromiumLoader` منتقل می‌شود:

```python
node = FetchNode(
    input="url",
    output=["doc"],
    node_config={
        "timeout": 30,  # ChromiumLoader will use 30-second timeout
        "headless": True
    }
)

state = {"url": "https://example.com"}
result = node.execute(state)
```

اگر برای ChromiumLoader به‌طور خاص رفتار متفاوتی می‌خواهید، می‌توانید آن را در `loader_kwargs` بازنویسی کنید:

```python
node = FetchNode(
    input="url",
    output=["doc"],
    node_config={
        "timeout": 30,  # General timeout for other operations
        "loader_kwargs": {
            "timeout": 60  # ChromiumLoader gets 60-second timeout
        }
    }
)
```

## مثال‌های گراف

### SmartScraperGraph

```python
from scrapegraphai.graphs import SmartScraperGraph

graph_config = {
    "llm": {
        "model": "gpt-3.5-turbo",
        "api_key": "your-api-key"
    },
    "timeout": 20  # 20-second timeout for fetch operations
}

smart_scraper = SmartScraperGraph(
    prompt="Extract all article titles",
    source="https://news.example.com",
    config=graph_config
)

result = smart_scraper.run()
```

### گراف سفارشی با FetchNode

```python
from scrapegraphai.nodes import FetchNode
from langgraph.graph import StateGraph

# Create a custom graph with timeout
fetch_node = FetchNode(
    input="url",
    output=["doc"],
    node_config={
        "timeout": 15,
        "headless": True
    }
)

# Add to graph...
```

## بهترین شیوه‌ها

1. **timeoutهای مناسب انتخاب کنید**: به زمان پاسخ مورد انتظار وب‌سایت‌های هدف‌تان فکر کنید
   - APIهای سریع: ۵ تا ۱۰ ثانیه
   - وب‌سایت‌های معمولی: ۱۵ تا ۳۰ ثانیه
   - PDFهای بزرگ یا سایت‌های کند: بیش از ۶۰ ثانیه

2. **مدیریت TimeoutError**: هنگام استفاده از timeout، کدتان را همیشه داخل try-except بگذارید:

```python
try:
    result = node.execute(state)
except TimeoutError as e:
    logger.error(f"Operation timed out: {e}")
    # Handle timeout gracefully
```

3. **برای عملیات‌های مختلف timeoutهای متفاوت تعیین کنید**: برای تجزیهٔ PDF مقدار بالاتر و برای درخواست‌های HTTP مقدار پایین‌تری بگذارید:

```python
# For PDFs
pdf_node = FetchNode("pdf", ["doc"], {"timeout": 120})

# For web pages
web_node = FetchNode("url", ["doc"], {"timeout": 15})
```

4. **وقوع timeoutها را پایش کنید**: خطاهای timeout را ثبت (log) کنید تا منابع مشکل‌دار شناسایی شوند:

```python
import logging

logger = logging.getLogger(__name__)

try:
    result = node.execute(state)
except TimeoutError as e:
    logger.warning(f"Timeout for {state.get('url', 'unknown')}: {e}")
```

## جزئیات پیاده‌سازی

قابلیت timeout با این ابزارها پیاده‌سازی شده است:

- **درخواست‌های HTTP**: پارامتر `requests.get(url, timeout=X)`
- **تجزیهٔ PDF**: `concurrent.futures.ThreadPoolExecutor` همراه با `future.result(timeout=X)`
- **ChromiumLoader**: انتقال از طریق دیکشنری `loader_kwargs`

وقتی `timeout=None` باشد، هیچ محدودیت زمانی اعمال نمی‌شود و عملیات‌ها تا اتمام اجرا می‌شوند.

## رفع اشکال

### timeout بیش از حد کوتاه است

اگر مرتباً با خطای timeout روبه‌رو می‌شوید، مقدار timeout را افزایش دهید:

```python
node_config = {"timeout": 60}  # Increase from 30 to 60 seconds
```

### به timeoutهای متفاوت برای عملیات‌های مختلف نیاز دارید

از نمونه‌های جداگانهٔ FetchNode با پیکربندی‌های متفاوت استفاده کنید:

```python
fast_fetcher = FetchNode("url", ["doc"], {"timeout": 10})
slow_fetcher = FetchNode("pdf", ["doc"], {"timeout": 120})
```

### timeout مربوط به ChromiumLoader کار نمی‌کند

مطمئن شوید timeout را در `loader_kwargs` بازنویسی نکرده‌اید:

```python
# ❌ Wrong - explicit loader_kwargs timeout overrides node timeout
node_config = {
    "timeout": 30,
    "loader_kwargs": {"timeout": 10}  # This takes precedence
}

# ✅ Correct - let node timeout propagate
node_config = {
    "timeout": 30  # ChromiumLoader will use 30 seconds
}
```

## همچنین ببینید

- [کد منبع FetchNode](../scrapegraphai/nodes/fetch_node.py)
- [مثال‌های گراف](#مثال‌های-گراف)
- [بهترین شیوه‌های مدیریت timeout](#بهترین-شیوه‌ها)
