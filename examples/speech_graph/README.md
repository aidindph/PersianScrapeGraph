# مثال گراف گفتار (Speech Graph)

این مثال نشان می‌دهد چگونه می‌توان از Scrapegraph-ai برای پردازش و تحلیل گفتار استفاده کرد.

## قابلیت‌ها

- تبدیل گفتار به متن (speech-to-text)
- پردازش صوت
- تحلیل متن
- تحلیل احساسات (sentiment analysis)

## راه‌اندازی

1. وابستگی‌های مورد نیاز را نصب کنید
2. فایل `.env.example` را به `.env` کپی کنید
3. کلیدهای API خود را در فایل `.env` پیکربندی کنید

## نحوهٔ استفاده

```python
from scrapegraphai.graphs import SpeechGraph

graph = SpeechGraph()
text = graph.process("audio_file.mp3")
```

## متغیرهای محیطی

متغیرهای محیطی مورد نیاز:
- `OPENAI_API_KEY`: کلید API شرکت OpenAI شما
- `WHISPER_API_KEY`: کلید API سرویس Whisper شما (اختیاری)
