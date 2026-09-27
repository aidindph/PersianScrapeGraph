"""
PersianScrapeGraph — سرویس API موتور استخراج
================================================

یک پوشش FastAPI حول کتابخانهٔ scrapegraphai که گراف کامل
SmartScraperGraph را از طریق یک REST API ساده در دسترس قرار می‌دهد.

اجرا (توسعهٔ محلی):
    pip install -e .                       # نصب کتابخانه از ریشهٔ ریپو
    pip install -r api-service/requirements.txt
    uvicorn main:app --app-dir api-service --reload

اجرا (داکر، از ریشهٔ ریپو):
    docker build -f api-service/Dockerfile -t persianscrapegraph-api .
    docker run -p 8000:8000 --env-file api-service/.env persianscrapegraph-api
"""

import os
import time
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from scrapegraphai.graphs import SmartScraperGraph

# ─── پیکربندی از متغیرهای محیطی ────────────────────────────────────────────
SGAI_MODEL = os.getenv("SGAI_MODEL", "ollama/llama3.2")
SGAI_OLLAMA_URL = os.getenv("SGAI_OLLAMA_URL", "http://localhost:11434")
SGAI_API_KEY = os.getenv("SGAI_API_KEY", "")

app = FastAPI(
    title="PersianScrapeGraph API",
    version="1.0.0",
    description="موتور استخراج دادهٔ هوشمند — فورک فارسی ScrapeGraphAI",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # در محیط واقعی، دامنهٔ داشبورد خود را قرار دهید
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScrapeRequest(BaseModel):
    """بدنهٔ درخواست استخراج."""

    url: str
    prompt: str
    fields: Optional[str] = None
    model: Optional[str] = None


def build_graph_config(model: Optional[str]) -> dict:
    """ساخت graph_config بر اساس مدل انتخابی و متغیرهای محیطی."""
    chosen = (model or SGAI_MODEL).strip()
    llm: dict = {"model": chosen, "temperature": 0}

    if chosen.startswith("ollama/"):
        # مدل محلی — نشانی سرویس Ollama
        llm["base_url"] = SGAI_OLLAMA_URL
        llm["model_tokens"] = 4096
    elif SGAI_API_KEY:
        # مدل ابری سازگار با OpenAI
        llm["api_key"] = SGAI_API_KEY

    return {"llm": llm, "verbose": True, "headless": True}


@app.get("/health")
def health() -> dict:
    """بررسی سلامت سرویس."""
    return {"status": "ok", "service": "PersianScrapeGraph API", "model": SGAI_MODEL}


@app.post("/scrape")
def scrape(req: ScrapeRequest) -> dict:
    """اجرای SmartScraperGraph روی یک صفحهٔ وب با پرومپت فارسی."""
    url = req.url.strip()
    prompt = req.prompt.strip()

    if not url.startswith(("http://", "https://")):
        raise HTTPException(status_code=400, detail="آدرس صفحه باید با http:// یا https:// شروع شود.")
    if not prompt:
        raise HTTPException(status_code=400, detail="دستور استخراج (prompt) نمی‌تواند خالی باشد.")

    if req.fields:
        prompt = f"{prompt}\nکلیدهای اصلی خروجی این‌ها باشند: {req.fields}"

    config = build_graph_config(req.model)
    started = time.time()

    try:
        graph = SmartScraperGraph(prompt=prompt, source=url, config=config)
        result = graph.run()
    except Exception as exc:  # noqa: BLE001 - خطاهای گراف به کاربر منتقل می‌شود
        raise HTTPException(
            status_code=500,
            detail=f"اجرای گراف استخراج ناموفق بود: {exc}",
        ) from exc

    return {
        "success": True,
        "data": result,
        "stats": {
            "durationMs": int((time.time() - started) * 1000),
            "charsProcessed": 0,
            "model": req.model or SGAI_MODEL,
        },
    }
