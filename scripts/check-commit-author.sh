#!/usr/bin/env bash
# ============================================================================
#  PersianScrapeGraph — Commit Author Policy (repo rule)
#
#  🔒 RULE: ALL commits must be authored by:
#           Aidin Ghassemi <aidindph@users.noreply.github.com>
#
#  Modes:
#    1) local pre-commit : checks the configured git identity
#    2) CI (--range ARG) : checks every author in a commit range
#
#  Used by: .pre-commit-config.yaml (local hook) and
#           .github/workflows/commit-author-check.yml (CI)
# ============================================================================
set -u

EXPECTED_NAME="Aidin Ghassemi"
EXPECTED_EMAIL="aidindph@users.noreply.github.com"

# ---------------------------------------------------------------------------
# CI mode: check every author inside a commit range
#   usage: check-commit-author.sh --range "<git-log-range>"
# ---------------------------------------------------------------------------
if [ "${1:-}" = "--range" ] && [ -n "${2:-}" ]; then
    VIOLATIONS="$(git log "${2}" --format='%h%x09%an%x09%ae' \
        | awk -F'\t' -v n="$EXPECTED_NAME" -v e="$EXPECTED_EMAIL" \
              '$2 != n || $3 != e { printf "    ✗ %s  →  %s <%s>\n", $1, $2, $3 }')"
    if [ -n "$VIOLATIONS" ]; then
        echo ""
        echo "❌  COMMIT AUTHOR POLICY VIOLATION — قانون ریپو نقض شد"
        echo "    All commits must be authored by: $EXPECTED_NAME <$EXPECTED_EMAIL>"
        echo ""
        echo "Offending commits:"
        echo "$VIOLATIONS"
        echo ""
        echo "🔧 Fix with:"
        echo "    git config user.name  \"$EXPECTED_NAME\""
        echo "    git config user.email \"$EXPECTED_EMAIL\""
        echo "    git commit --amend --reset-author --no-edit"
        exit 1
    fi
    exit 0
fi

# ---------------------------------------------------------------------------
# Local mode: check the configured git identity before a commit is created
# ---------------------------------------------------------------------------
NAME="$(git config user.name)"
EMAIL="$(git config user.email)"

if [ "$NAME" != "$EXPECTED_NAME" ] || [ "$EMAIL" != "$EXPECTED_EMAIL" ]; then
    echo ""
    echo "❌  COMMIT REJECTED — قانون ریپو PersianScrapeGraph"
    echo "    All commits MUST be authored by: $EXPECTED_NAME <$EXPECTED_EMAIL>"
    echo ""
    echo "    Current git identity:"
    echo "      user.name : ${NAME:-<unset>}"
    echo "      user.email: ${EMAIL:-<unset>}"
    echo ""
    echo "    🔧 Fix it by running:"
    echo "      git config user.name  \"$EXPECTED_NAME\""
    echo "      git config user.email \"$EXPECTED_EMAIL\""
    echo ""
    exit 1
fi

echo "✅ Commit author OK: $EXPECTED_NAME <$EXPECTED_EMAIL>"
exit 0
