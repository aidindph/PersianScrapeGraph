# AGENTS.md

راهنمای عامل‌های کدنویسی هوش مصنوعی (Claude Code، Codex، Cursor، عامل‌های Copilot و…) که روی
**ScrapeGraphAI** کار می‌کنند. همکاران انسانی باید
[CONTRIBUTING.md](CONTRIBUTING.md) را بخوانند؛ هر آنچه اینجا آمده، در کنار همان راهنما اعمال می‌شود.

---

## ⚠️ 0. قانون فورک PersianScrapeGraph (الزامی — با CI اجرا می‌شود)

This repository is the **PersianScrapeGraph** fork
(origin: `github.com/aidindph/PersianScrapeGraph`,
upstream: `github.com/ScrapeGraphAI/Scrapegraph-ai`).

> **All commits and pushes MUST be authored by
> `Aidin Ghassemi <aidindph@users.noreply.github.com>`.**
>
> **تمام کامیت‌ها و پوش‌ها باید به نام
> `Aidin Ghassemi <aidindph@users.noreply.github.com>` انجام شوند.**

pre-commit hook (`scripts/check-commit-author.sh`) و
workflow ‏CI با عنوان `Commit Author Policy`
(`.github/workflows/commit-author-check.yml`)
هر چیز دیگری را به‌صورت خودکار **رد می‌کنند**. یک‌بار، بلافاصله پس از clone، پیکربندی کنید:

```bash
git config user.name  "Aidin Ghassemi"
git config user.email "aidindph@users.noreply.github.com"
```

جزئیات کامل: [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 1. قانون طلایی: همه‌چیز به `pre/beta` می‌رود

**به شاخهٔ `main` هرگز مستقیم کاری نمی‌کنیم. تمام کارها بر پایهٔ `pre/beta` انجام و به آن merge می‌شوند.**

`pre/beta` شاخهٔ پیش‌انتشار است: هر push به این شاخه از طریق
semantic-release (نگاه کنید به `.releaserc.yml`) یک پیش‌انتشار `beta` منتشر می‌کند.
شاخهٔ `main` فقط زمانی release دریافت می‌کند که یک نگهدارنده، `pre/beta` را ارتقا دهد.

```bash
# 1. always start from an up-to-date pre/beta
git fetch origin
git checkout -b feat/my-change origin/pre/beta

# 2. commit your work
git add <only the files you touched>
git commit -m "feat(nodes): add X"

# 3. push and open the PR against pre/beta
git push -u origin feat/my-change
gh pr create --base pre/beta --title "feat(nodes): add X" --body "..."
```

چک‌لیست قبل از کامیت:

- [ ] شاخه بر پایهٔ `origin/pre/beta` است (`git merge-base --is-ancestor origin/pre/beta HEAD`).
- [ ] شاخهٔ پایهٔ PR برابر `pre/beta` است، **نه** `main`.
- [ ] هیچ کامیت مستقیمی روی `main` یا `pre/beta` وجود ندارد و force-push روی هیچ‌کدام انجام نشده است.
- [ ] هر شاخه/PR فقط شامل یک تغییر منطقی است.

اگر کاری واقعاً نیاز به هدف‌گیری `main` دارد (مثلاً هات‌فیکس روی یک نسخهٔ منتشرشده)،
اول متوقف شوید و از یک نگهدارنده بپرسید.

## 2. راه‌اندازی محیط

پایتون `>=3.12` و مدیریت وابستگی‌ها با [uv](https://docs.astral.sh/uv/):

```bash
uv sync                     # create the venv and install deps
uv run pre-commit install   # install the git hooks
```

هرگز `uv.lock` را دستی ویرایش نکنید؛ آن را با `uv lock` / `uv sync` بازتولید کنید و فقط زمانی
نتیجه را کامیت کنید که واقعاً وابستگی‌های `pyproject.toml` را تغییر داده باشید.

## 3. بررسی‌هایی که قبل از push باید اجرا شوند

```bash
make lint         # ruff + black --check + isort --check-only
make type-check   # mypy (strict)
make test         # pytest with coverage
make pre-commit   # run all hooks on all files
```

حداقل `make lint` و تست‌های مربوط به بخش‌هایی که تغییر داده‌اید را اجرا کنید. نتیجهٔ
واقعی را گزارش کنید: اگر چیزی fail شد یا مرحله‌ای را رد کردید، آن را در توضیحات PR
بگویید، نه اینکه القا کنید همه‌چیز تمیز بوده است.

سبک: PEP 8 + docstringهای سبک Google Python، قالب‌بندی `black`، طول خط ۸۸.
با قواعد حاکم بر فایل اطراف هماهنگ باشید، به‌جای اینکه قواعد جدیدی وارد کنید.

## 4. پیام‌های کامیت

پیام‌های کامیت توسط semantic-release (Conventional Commits، پیش‌تنظیم
`conventionalcommits`) تجزیه می‌شوند؛ بنابراین پیام کامیت شمارهٔ نسخهٔ بعدی را تعیین می‌کند. استفاده کنید:

```
feat:     ✨ new feature          -> minor bump
fix:      🐛 bug fix              -> patch bump
docs:     📚 documentation
style:    💅 formatting only
refactor: ♻️  no behaviour change
perf:     ⚡ performance
test:     🧪 tests
build:    📦 build system / deps
ci:       🤖 CI configuration
chore:    🧹 everything else
```

قالب: `type(optional-scope): imperative summary`، به‌همراه بدنهٔ اختیاری و
`BREAKING CHANGE:` در پاورقی برای تغییرات ناسازگار. برای ارجاع به issueها از
`Fixes #123` استفاده کنید.

## 5. فایل‌هایی که عامل‌ها نباید تغییر دهند

- `CHANGELOG.md` و فیلد `version` در `pyproject.toml` — مالکشان
  semantic-release است؛ ویرایش دستی آن‌ها انتشارها را خراب می‌کند.
- تگ‌های git و یادداشت‌های انتشار روی GitHub.
- `.github/workflows/*` — فقط وقتی که موضوعِ کار خودِ CI باشد.
- هر چیزی زیر `htmlcov/`، `coverage.xml`، `.pytest_cache/`، `__pycache__/`:
  خروجی‌های build هستند و هرگز نباید کامیت شوند.

همچنین: هرگز secret کامیت نکنید. کلیدهای API در یک فایل `.env` محلی (که git آن را نادیده می‌گیرد)
قرار می‌گیرند و با `os.getenv` خوانده می‌شوند؛ مثال‌ها و تست‌ها باید از placeholderهایی مانند
`OPENAI_APIKEY` از محیط استفاده کنند.

## 6. ساختار ریپازیتوری

```
scrapegraphai/
├── graphs/        # pipelines (SmartScraperGraph, SearchGraph, …)
├── nodes/         # single graph steps (FetchNode, ParseNode, GenerateAnswerNode, …)
├── models/        # LLM wrappers and token/model metadata
├── docloaders/    # loaders (ChromiumLoader, …)
├── prompts/       # prompt templates
├── helpers/       # shared constants and schemas
├── integrations/  # third-party / managed-API integrations
└── utils/         # utilities (html cleanup, tokenization, …)
examples/          # runnable usage examples, one folder per graph
tests/             # pytest suite, mirrors the package layout
docs/              # documentation sources
```

هنگام افزودن node یا graph جدید، آن را در `__init__.py` مربوطه ثبت کنید و
کنار تست‌های موجود آن لایه، یک تست زیر `tests/` اضافه کنید. قابلیت‌های جدیدِ
روی کاربر باید در `examples/` مدخلی داشته باشند و اگر رفتار عمومی را تغییر می‌دهند، مستندات هم به‌روز شود.

## 7. سبک کاری مورد انتظار از عامل‌ها

- diffهای کوچک و قابل بازبینی را ترجیح دهید؛ فایل‌های دست‌نخورده را بازقالب‌بندی یا «تمیز» نکنید.
- وابستگی جدید اضافه نکنید، مگر اینکه کار به آن نیاز داشته باشد — و دلیلش را در PR بگویید.
- همهٔ کامیت‌ها، عنوان/متن PRها، کامنت‌های issue، کامنت‌های کد و docstringها را
  **به انگلیسی** بنویسید.
- تست‌های موجود را برای رد شدنِ یک تغییر حذف یا بازنویسی نکنید.
- اگر تستی از قبل روی `pre/beta` fail است، به آن اشاره کنید، به‌جای اینکه بی‌سروصدا
  چیزهای بی‌ربط را در همان PR درست کنید.
- هرگز کارِ در جریانِ دیگران را کامیت نکنید: `git status` را بررسی کنید و فقط
  فایل‌های مربوط به تغییر خودتان را stage کنید.
