# ─────────────────────────────────────────────────────────────────────────────
#  PersianScrapeGraph — سرویس API موتور استخراج
#  بیلد از ریشهٔ ریپو:
#      docker build -f api-service/Dockerfile -t persianscrapegraph-api .
#      docker run -p 8000:8000 --env-file api-service/.env persianscrapegraph-api
# ─────────────────────────────────────────────────────────────────────────────
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    SCRAPEGRAPHAI_TELEMETRY_ENABLED=false

WORKDIR /app

# نصب کتابخانهٔ scrapegraphai از سورس همین ریپو + وابستگی‌های سرویس
COPY pyproject.toml README.md ./
COPY scrapegraphai ./scrapegraphai
COPY api-service/requirements.txt ./api-service/requirements.txt

RUN pip install --no-cache-dir -e . \
    && pip install --no-cache-dir -r api-service/requirements.txt \
    && python -m playwright install --with-deps chromium

COPY api-service ./api-service

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--app-dir", "api-service"]
