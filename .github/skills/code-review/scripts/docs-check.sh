#!/bin/bash
# docs-check.sh
# Validates documentation consistency and accuracy
# Usage: bash ./scripts/docs-check.sh

set -e

echo "📚 Documentation Review"
echo "======================="

ISSUES=0

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

# 1. Humanet Validation
echo ""
echo "🔍 Validating Humanet structure..."
if command -v humanet &> /dev/null; then
    if humanet validate > /tmp/humanet.log 2>&1; then
        echo -e "${GREEN}✅ Humanet validation passed${NC}"
    else
        echo -e "${RED}❌ Humanet validation failed${NC}"
        cat /tmp/humanet.log | head -20
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Humanet CLI not installed${NC}"
    echo "   Install with: pnpm install -g create-humanet"
fi

# 2. ADR References
echo ""
echo "📋 Checking ADR files..."
if [ -d ".humanet/discussions" ]; then
    ADR_COUNT=$(ls -1 .humanet/discussions/*.md 2>/dev/null | wc -l || echo "0")
    echo -e "${GREEN}✅ Found $ADR_COUNT ADRs${NC}"
    
    # Check if ADRs are properly formatted
    for adr in .humanet/discussions/*.md; do
        if [ -f "$adr" ]; then
            if ! grep -q "^# ADR\|^# " "$adr"; then
                echo -e "${YELLOW}⚠️  ADR missing title: $(basename $adr)${NC}"
                ISSUES=$((ISSUES + 1))
            fi
        fi
    done
else
    echo -e "${RED}❌ .humanet/discussions directory not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

# 3. README Accuracy
echo ""
echo "📖 Checking README..."
if [ -f "README.md" ]; then
    echo -e "${GREEN}✅ README.md exists${NC}"
    
    # Check for common issues
    if grep -q "TODO\|FIXME\|XXX" README.md; then
        echo -e "${YELLOW}⚠️  README contains TODO markers${NC}"
        grep "TODO\|FIXME\|XXX" README.md | head -3
    fi
    
    # Verify installation commands
    if grep -q "pnpm install\|npm install" README.md; then
        echo -e "${GREEN}✅ Installation instructions present${NC}"
    else
        echo -e "${YELLOW}⚠️  No installation instructions in README${NC}"
    fi
else
    echo -e "${RED}❌ README.md not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

# 4. ROADMAP Validation
echo ""
echo "🗺️  Checking ROADMAP..."
if [ -f "ROADMAP.md" ]; then
    echo -e "${GREEN}✅ ROADMAP.md exists${NC}"
    
    # Check if phases are documented
    if grep -q "Phase\|phase" ROADMAP.md; then
        PHASES=$(grep -c "Phase\|phase" ROADMAP.md)
        echo "   Found $PHASES phase references"
    else
        echo -e "${YELLOW}⚠️  ROADMAP may lack phase structure${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  ROADMAP.md not found${NC}"
fi

# 5. COPILOT.md Rules
echo ""
echo "🤖 Checking COPILOT.md..."
if [ -f "COPILOT.md" ]; then
    echo -e "${GREEN}✅ COPILOT.md exists${NC}"
    
    # Check if key sections are present
    if grep -q "Architecture\|Package\|Module" COPILOT.md; then
        echo "   Key sections present"
    else
        echo -e "${YELLOW}⚠️  COPILOT.md may be incomplete${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  COPILOT.md not found${NC}"
fi

# 6. Commit Message Quality
echo ""
echo "💬 Checking recent commit messages..."
RECENT_COMMITS=$(git log --oneline -10 2>/dev/null || echo "")
if [ ! -z "$RECENT_COMMITS" ]; then
    BAD_COMMITS=$(echo "$RECENT_COMMITS" | grep -c "^[a-f0-9]* $\|^[a-f0-9]* \..*\|^[a-f0-9]* WIP" || echo "0")
    
    if [ "$BAD_COMMITS" -eq 0 ]; then
        echo -e "${GREEN}✅ Commit messages well-formed${NC}"
    else
        echo -e "${YELLOW}⚠️  Found $BAD_COMMITS commits with unclear messages${NC}"
        echo "$RECENT_COMMITS" | head -3
    fi
else
    echo -e "${YELLOW}ℹ️  No git history available${NC}"
fi

# 7. File Documentation
echo ""
echo "📄 Checking source file documentation..."
UNDOCUMENTED=$(find src apps -name "*.js" -o -name "*.ts" 2>/dev/null | \
    xargs grep -L "^\s*\/\/\|^\s*\/\*\|^\s*\*\|^/**" 2>/dev/null | wc -l || echo "0")

if [ "$UNDOCUMENTED" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $UNDOCUMENTED files lack documentation comments${NC}"
else
    echo -e "${GREEN}✅ Source files documented${NC}"
fi

# 8. Environment Documentation
echo ""
echo "🌍 Checking environment documentation..."
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ .env.example exists${NC}"
    
    # Verify all env vars in use are documented
    ENV_VARS=$(grep -r "process\.env\." --include="*.js" --include="*.ts" src apps 2>/dev/null | \
        grep -o "process\.env\.[A-Z_]*" | sort -u | sed 's/process\.env\.//')
    
    MISSING=0
    for var in $ENV_VARS; do
        if ! grep -q "$var" .env.example; then
            echo -e "  ⚠️  $var used but not in .env.example"
            MISSING=$((MISSING + 1))
        fi
    done
    
    if [ "$MISSING" -eq 0 ]; then
        echo -e "  ${GREEN}✓ All env vars documented${NC}"
    else
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${YELLOW}⚠️  .env.example not found (recommended for clarity)${NC}"
fi

# 9. Project Structure Documentation
echo ""
echo "📂 Checking PROJECT_STRUCTURE.md..."
if [ -f ".humanet/PROJECT_STRUCTURE.md" ]; then
    echo -e "${GREEN}✅ PROJECT_STRUCTURE.md exists${NC}"
    
    # Verify it matches actual structure
    if [ -d "apps" ]; then
        ACTUAL_MODULES=$(ls -d apps/*/ 2>/dev/null | wc -l || echo "0")
        DOCUMENTED=$(grep -c "apps/" .humanet/PROJECT_STRUCTURE.md || echo "0")
        
        if [ "$ACTUAL_MODULES" -eq "$DOCUMENTED" ]; then
            echo -e "  ${GREEN}✓ Structure documentation up-to-date${NC}"
        else
            echo -e "  ${YELLOW}⚠️  Structure documentation may be outdated (found $ACTUAL_MODULES modules)${NC}"
        fi
    fi
else
    echo -e "${YELLOW}⚠️  PROJECT_STRUCTURE.md not found${NC}"
fi

# Summary
echo ""
echo "======================="
if [ "$ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✅ Documentation review PASSED${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Documentation review found $ISSUES issues${NC}"
    exit 0  # Don't fail for documentation issues
fi
