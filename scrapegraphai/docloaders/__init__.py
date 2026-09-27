"""
این ماژول قابلیت‌های بارگذاری اسناد را برای ScrapeGraphAI مدیریت می‌کند.

نکته: ChromiumLoader و PlasmateLoader به‌صورت lazy بارگذاری می‌شوند تا در زمان import،
بارگذاری DLLهای torchcodec/FFmpeg (زنجیرهٔ sentence_transformers ← torchcodec) فعال نشود.
"""

from .browser_base import browser_base_fetch
from .scrape_do import scrape_do_fetch

_LAZY_MODULES = {
    "ChromiumLoader": ".chromium",
    "PlasmateLoader": ".plasmate",
}


def __getattr__(name):
    if name in _LAZY_MODULES:
        import importlib
        module = importlib.import_module(_LAZY_MODULES[name], __package__)
        return getattr(module, name)
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")


__all__ = [
    "browser_base_fetch",
    "ChromiumLoader",
    "PlasmateLoader",
    "scrape_do_fetch",
]
