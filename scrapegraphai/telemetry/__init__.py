"""
این ماژول تله‌متری ناشناس پکیج scrapegraphai را مدیریت می‌کند
(با متغیر محیطی SCRAPEGRAPHAI_TELEMETRY_ENABLED=false قابل غیرفعال‌شدن است).
"""

from .telemetry import disable_telemetry, log_event, log_graph_execution

__all__ = [
    "disable_telemetry",
    "log_event",
    "log_graph_execution",
]
