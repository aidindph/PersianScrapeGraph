# ⚠️ قوانین ریپو PersianScrapeGraph (الزامی)

این ریپو، یک کلون/فورک توسعه‌یافته از [ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai) است که برای توسعه مستقل ایجاد شده. طبق مجوز MIT، لایسنس و حقوق نویسندگان اصلی پروژه حفظ شده است.

## 🔒 قانون طلایی: هویت نویسنده کامیت‌ها

> **تمام کامیت‌ها و پوش‌های این ریپو باید به نام «Aidin Ghassemi» انجام شوند.**

- **نام نویسنده:** `Aidin Ghassemi`
- **ایمیل نویسنده:** `aidindph@users.noreply.github.com`

این قانون به‌صورت خودکار در **دو لایه** اجرا می‌شود:

| لایه | مکانیزم | فایل‌ها |
|------|---------|---------|
| لوکال (هنگام کامیت) | pre-commit hook | `.pre-commit-config.yaml` + `scripts/check-commit-author.sh` |
| گیتهاب (هنگام push/PR) | CI workflow | `.github/workflows/commit-author-check.yml` |

اگر هویت git شما با مقادیر بالا مطابقت نداشته باشد، کامیت به‌صورت خودکار **رد می‌شود** (لوکال) و CI روی گیتهاب **fail** می‌شود (ریموت).

### راه‌اندازی (یک‌بار پس از clone)

```bash
git config user.name  "Aidin Ghassemi"
git config user.email "aidindph@users.noreply.github.com"

# فعال‌سازی چک خودکار هویت هنگام کامیت
uv run pre-commit install
```

### رفع خطا در صورت رد شدن کامیت

```bash
git config user.name  "Aidin Ghassemi"
git config user.email "aidindph@users.noreply.github.com"
git commit --amend --reset-author --no-edit   # اصلاح نویسنده آخرین کامیت
```

---

# مشارکت در ScrapeGraphAI 🚀

سلام! ممنون که به **ScrapeGraphAI** سر زدید! خوشحالیم که اینجا هستید! 🎉

## راهنمای شروع سریع 🏃‍♂️

1. ریپازیتوری را از **شاخهٔ pre/beta** فورک کنید 🍴
2. فورک خود را به‌صورت محلی clone کنید 💻
3. uv را نصب کنید (اگر هنوز نصب نکرده‌اید):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
4. دستور `uv sync` را اجرا کنید (محیط مجازی می‌سازد و وابستگی‌ها را نصب می‌کند) ⚡
5. دستور `uv run pre-commit install` را اجرا کنید 🔧
6. تغییرات فوق‌العادهٔ خود را اعمال کنید ✨
7. همه‌چیز را کامل تست کنید 🧪
8. پوش کنید و برای شاخهٔ pre/beta یک PR باز کنید 🎯

## اصول مشارکت 📝

همیشه تمیز و ساده کار کنید:
- سبک کدنویسی ما را رعایت کنید (PEP 8 و Google Python Style) 🎨
- تغییرات‌تان را به‌روشنی مستند کنید 📚
- برای کامیت نهایی PR خود از این پیشوندها استفاده کنید:
  ```
  feat: ✨ New feature
  fix: 🐛 Bug fix
  docs: 📚 Documentation
  style: 💅 Code style
  refactor: ♻️ Code changes
  test: 🧪 Testing
  perf: ⚡ Performance
  ```
- با دیگران با احترام رفتار کنید! 💝

## کمک نیاز دارید؟ 🤔

باگ پیدا کردید یا ایدهٔ جالبی دارید؟ یک issue باز کنید تا درباره‌اش صحبت کنیم! 💬

## مجوز 📜

این پروژه با مجوز MIT منتشر شده است. برای جزئیات، فایل [LICENSE](LICENSE) را ببینید.

بیایید با هم چیزی شگفت‌انگیز بسازیم! 🌟
