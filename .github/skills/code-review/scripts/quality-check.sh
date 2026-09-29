#!/bin/bash
# quality-check.sh
# Validates code quality (linting, types, formatting, tests)
# Usage: bash ./scripts/quality-check.sh

set -e

echo "✨ Code Quality Review"
echo "===================="

FAILURES=0

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. ESLint Check
echo ""
echo "🔍 Running ESLint..."
if command -v eslint &> /dev/null; then
    if pnpm run lint 2>&1 | tee /tmp/eslint.log; then
        echo -e "${GREEN}✅ ESLint passed${NC}"
    else
        ERRORS=$(grep -c "error" /tmp/eslint.log || echo "?")
        WARNINGS=$(grep -c "warning" /tmp/eslint.log || echo "?")
        echo -e "${RED}❌ ESLint found issues ($ERRORS errors, $WARNINGS warnings)${NC}"
        FAILURES=$((FAILURES + 1))
    fi
else
    echo -e "${YELLOW}⚠️  ESLint not installed - skipping${NC}"
fi

# 2. TypeScript Check
echo ""
echo "📝 Running TypeScript type check..."
if [ -f "tsconfig.json" ]; then
    if pnpm run type:check 2>&1 | tee /tmp/tsc.log; then
        echo -e "${GREEN}✅ TypeScript passed${NC}"
    else
        ERRORS=$(grep -c "error TS" /tmp/tsc.log || echo "?")
        echo -e "${RED}❌ TypeScript found $ERRORS type errors${NC}"
        tail -15 /tmp/tsc.log
        FAILURES=$((FAILURES + 1))
    fi
else
    echo -e "${YELLOW}⚠️  tsconfig.json not found - skipping${NC}"
fi

# 3. Prettier Format Check
echo ""
echo "🎨 Checking code formatting..."
if command -v prettier &> /dev/null; then
    if pnpm run format:check 2>&1; then
        echo -e "${GREEN}✅ Code formatting correct${NC}"
    else
        echo -e "${YELLOW}⚠️  Code formatting issues found${NC}"
        echo "   Auto-fix with: pnpm run format"
        FAILURES=$((FAILURES + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Prettier not installed - skipping${NC}"
fi

# 4. Test Coverage
echo ""
echo "🧪 Running tests..."
if [ -f "jest.config.js" ] || [ -f "package.json" ] && grep -q "jest" package.json; then
    if pnpm run test 2>&1 | tee /tmp/jest.log; then
        echo -e "${GREEN}✅ Tests passed${NC}"
        
        # Check coverage
        if grep -q "TOTAL" /tmp/jest.log; then
            COVERAGE=$(grep "TOTAL" /tmp/jest.log | tail -1)
            echo -e "   Coverage: $COVERAGE"
        fi
    else
        FAILED=$(grep -c "FAIL " /tmp/jest.log || echo "?")
        echo -e "${RED}❌ Tests failed ($FAILED test suites)${NC}"
        tail -20 /tmp/jest.log
        FAILURES=$((FAILURES + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Jest not configured - skipping${NC}"
fi

# 5. Unused Variables/Imports
echo ""
echo "🧹 Checking for unused imports and variables..."
UNUSED=$(grep -r "eslint-disable-next-line no-unused\|TODO.*unused\|FIXME.*unused" \
    --include="*.js" --include="*.ts" src/ 2>/dev/null | wc -l || echo "0")

if [ "$UNUSED" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found $UNUSED unused variable markers${NC}"
else
    echo -e "${GREEN}✅ No obvious unused code${NC}"
fi

# 6. Dependencies Audit
echo ""
echo "📦 Checking dependency health..."
if pnpm run audit 2>&1 > /tmp/audit.log; then
    echo -e "${GREEN}✅ Dependency audit passed${NC}"
else
    VULNS=$(grep -c "vulnerabilit" /tmp/audit.log || echo "?")
    echo -e "${YELLOW}⚠️  Potential vulnerability issues (run 'pnpm audit' for details)${NC}"
fi

# 7. Build Check
echo ""
echo "🔨 Testing build process..."
if grep -q '"build"' package.json; then
    if timeout 60 pnpm run build 2>&1 | tail -20; then
        echo -e "${GREEN}✅ Build successful${NC}"
    else
        echo -e "${YELLOW}⚠️  Build may have issues - check output above${NC}"
        FAILURES=$((FAILURES + 1))
    fi
else
    echo -e "${YELLOW}ℹ️  No build script found - skipping${NC}"
fi

# 8. File Size Analysis
echo ""
echo "📊 Analyzing file sizes..."
LARGE_FILES=$(find . -name "*.js" -o -name "*.ts" | xargs wc -l | sort -rn | head -5 | grep -v total)
echo "   Largest source files:"
echo "$LARGE_FILES" | awk '{printf "     %s: %d lines\n", $2, $1}'

VERY_LARGE=$(find . -name "*.js" -o -name "*.ts" | xargs wc -l | awk '$1 > 500' | wc -l)
if [ "$VERY_LARGE" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $VERY_LARGE files over 500 lines (consider refactoring)${NC}"
fi

# Summary
echo ""
echo "===================="
if [ "$FAILURES" -eq 0 ]; then
    echo -e "${GREEN}✅ Code quality review PASSED${NC}"
    exit 0
else
    echo -e "${RED}❌ Code quality review found $FAILURES issues${NC}"
    exit 1
fi
