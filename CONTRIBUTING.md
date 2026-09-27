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

# Contributing to ScrapeGraphAI 🚀

Hey there! Thanks for checking out **ScrapeGraphAI**! We're excited to have you here! 🎉

## Quick Start Guide 🏃‍♂️

1. Fork the repository from the **pre/beta branch** 🍴
2. Clone your fork locally 💻
3. Install uv (if you haven't):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
4. Run `uv sync` (creates virtual env & installs dependencies) ⚡
5. Run `uv run pre-commit install` 🔧
6. Make your awesome changes ✨
7. Test thoroughly 🧪
8. Push & open a PR to the pre/beta branch 🎯

## Contribution Guidelines 📝

Keep it clean and simple:
- Follow our code style (PEP 8 & Google Python Style) 🎨
- Document your changes clearly 📚
- Use these commit prefixes for your final PR commit:
  ```
  feat: ✨ New feature
  fix: 🐛 Bug fix
  docs: 📚 Documentation
  style: 💅 Code style
  refactor: ♻️ Code changes
  test: 🧪 Testing
  perf: ⚡ Performance
  ```
- Be nice to others! 💝

## Need Help? 🤔

Found a bug or have a cool idea? Open an issue and let's chat! 💬

## License 📜

MIT Licensed. See [LICENSE](LICENSE) file for details.

Let's build something amazing together! 🌟
