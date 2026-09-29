#!/bin/bash
# review-all.sh
# Master review script - runs all checks in sequence
# Usage: bash ./scripts/review-all.sh

echo "🎯 CampusOS Comprehensive Code Review"
echo "===================================="
echo ""
echo "This review encompasses:"
echo "  • Security vulnerabilities & secrets"
echo "  • Architecture pattern compliance"
echo "  • Code quality (lint, type, format, tests)"
echo "  • Documentation accuracy"
echo ""

START_TIME=$(date +%s)

# Run each check
echo ""
echo "════════════════════════════════════════════"
echo "1️⃣  Starting security review..."
echo "════════════════════════════════════════════"
bash .github/skills/code-review/scripts/security-check.sh || true

echo ""
echo "════════════════════════════════════════════"
echo "2️⃣  Starting architecture review..."
echo "════════════════════════════════════════════"
bash .github/skills/code-review/scripts/architecture-check.sh || true

echo ""
echo "════════════════════════════════════════════"
echo "3️⃣  Starting code quality review..."
echo "════════════════════════════════════════════"
bash .github/skills/code-review/scripts/quality-check.sh || true

echo ""
echo "════════════════════════════════════════════"
echo "4️⃣  Starting documentation review..."
echo "════════════════════════════════════════════"
bash .github/skills/code-review/scripts/docs-check.sh || true

# Calculate duration
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo ""
echo "════════════════════════════════════════════"
echo "✅ Review Complete (${DURATION}s)"
echo "════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "  • Review findings above"
echo "  • Fix critical issues before merging"
echo "  • Document exceptions in ADRs if needed"
echo "  • Run 'git add .' to stage changes"
