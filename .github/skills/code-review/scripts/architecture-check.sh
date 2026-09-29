#!/bin/bash
# architecture-check.sh
# Validates CampusOS adheres to modular architecture patterns
# Usage: bash ./scripts/architecture-check.sh

set -e

echo "🏗️  Architecture Consistency Review"
echo "===================================="

VIOLATIONS=0

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

# 1. Check for apps directory
echo ""
echo "📁 Checking module structure..."
if [ ! -d "apps" ]; then
    echo -e "${RED}❌ /apps directory not found - core structure missing${NC}"
    VIOLATIONS=$((VIOLATIONS + 1))
else
    echo -e "${GREEN}✅ /apps directory exists${NC}"
    
    # Check for required layers
    LAYERS=("foundation" "events" "execution" "operations" "growth" "system")
    for layer in "${LAYERS[@]}"; do
        if [ ! -d "apps/$layer" ]; then
            echo -e "${YELLOW}⚠️  Missing layer: apps/$layer${NC}"
        else
            echo -e "${GREEN}  ✓ $layer layer found${NC}"
        fi
    done
fi

# 2. Validate no code outside /apps
echo ""
echo "📍 Checking for code outside /apps structure..."
# Look for .js/.ts files in backend/src, backend/app, etc (not in root config files)
if find backend -name "*.js" -o -name "*.ts" 2>/dev/null | grep -v node_modules | grep -v "\.next" > /dev/null; then
    echo -e "${RED}❌ Found code files in /backend - should be in /apps${NC}"
    find backend -name "*.js" -o -name "*.ts" | grep -v node_modules | head -3
    VIOLATIONS=$((VIOLATIONS + 1))
else
    echo -e "${GREEN}✅ No stray code in /backend${NC}"
fi

if find frontend -name "*.js" -o -name "*.ts" 2>/dev/null | grep -v node_modules | grep -v "\.next" > /dev/null; then
    echo -e "${RED}❌ Found code files in /frontend - should be in /apps${NC}"
    VIOLATIONS=$((VIOLATIONS + 1))
else
    echo -e "${GREEN}✅ No stray code in /frontend${NC}"
fi

# 3. Check module entry points
echo ""
echo "📄 Validating module entry points..."
MODULES=$(ls -d apps/*/ 2>/dev/null | sed 's|/||' || echo "")
for module in $MODULES; do
    if [ ! -f "apps/$module/src/index.js" ]; then
        echo -e "${YELLOW}⚠️  Missing entry point: apps/$module/src/index.js${NC}"
        VIOLATIONS=$((VIOLATIONS + 1))
    else
        if grep -q "module\.exports\|export default\|exports\." "apps/$module/src/index.js"; then
            echo -e "${GREEN}  ✓ $module exports found${NC}"
        else
            echo -e "${YELLOW}⚠️  $module entry point has no exports${NC}"
        fi
    fi
done

# 4. Check for direct module imports (anti-pattern)
echo ""
echo "🔗 Checking for direct module-to-module imports..."
CROSS_IMPORTS=$(grep -r "from ['\"]\.\.\/\|from ['\"]\.\.\/\.\.\/\|from ['\"].*\/apps\/" \
    --include="*.js" --include="*.ts" apps/ 2>/dev/null | grep -v "node_modules" | wc -l || echo "0")

if [ "$CROSS_IMPORTS" -gt 0 ]; then
    echo -e "${RED}❌ Found $CROSS_IMPORTS direct module imports${NC}"
    grep -r "from ['\"]\.\.\/\|from ['\"]\.\.\/\.\.\/\|from ['\"].*\/apps\/" \
        --include="*.js" --include="*.ts" apps/ 2>/dev/null | head -3
    VIOLATIONS=$((VIOLATIONS + 1))
else
    echo -e "${GREEN}✅ No direct cross-module imports detected${NC}"
fi

# 5. Check plugin-loader configuration
echo ""
echo "🔌 Validating plugin loader setup..."
if grep -q "require.*plugin-loader\|import.*plugin-loader" backend/src/*.js 2>/dev/null; then
    echo -e "${GREEN}✅ Plugin loader configured${NC}"
else
    echo -e "${YELLOW}⚠️  Plugin loader not found in backend setup${NC}"
fi

# 6. Validate package.json in modules
echo ""
echo "📦 Checking module package.json files..."
MISSING_PKG=0
for module in $MODULES; do
    if [ ! -f "apps/$module/package.json" ]; then
        echo -e "${YELLOW}⚠️  Missing package.json in apps/$module${NC}"
        MISSING_PKG=$((MISSING_PKG + 1))
    fi
done

if [ "$MISSING_PKG" -eq 0 ]; then
    echo -e "${GREEN}✅ All modules have package.json${NC}"
else
    echo -e "${YELLOW}⚠️  $MISSING_PKG modules missing package.json${NC}"
fi

# 7. Check ADR alignment
echo ""
echo "📚 Checking ADR alignment..."
if [ -d ".humanet/discussions" ]; then
    echo -e "${GREEN}✅ Architecture Decision Records directory exists${NC}"
    ADR_COUNT=$(ls -1 .humanet/discussions/*.md 2>/dev/null | wc -l || echo "0")
    echo "   Found $ADR_COUNT ADRs"
else
    echo -e "${YELLOW}⚠️  .humanet/discussions directory not found${NC}"
fi

# 8. Check for circular dependencies
echo ""
echo "🔄 Scanning for potential circular dependencies..."
# Simple check: look for mutual imports between modules
CIRCULARS=$(grep -r "from.*foundation\|from.*events\|from.*execution" \
    --include="*.js" --include="*.ts" apps/ 2>/dev/null | \
    grep -c "foundation.*events\|events.*foundation\|execution.*events" || echo "0")

if [ "$CIRCULARS" -eq 0 ]; then
    echo -e "${GREEN}✅ No obvious circular dependencies${NC}"
else
    echo -e "${YELLOW}⚠️  Potential circular dependencies detected${NC}"
fi

# Summary
echo ""
echo "===================================="
if [ "$VIOLATIONS" -eq 0 ]; then
    echo -e "${GREEN}✅ Architecture review PASSED${NC}"
    exit 0
else
    echo -e "${RED}❌ Architecture review found $VIOLATIONS issues${NC}"
    exit 1
fi
