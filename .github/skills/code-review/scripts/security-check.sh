#!/bin/bash
# security-check.sh
# Comprehensive security review for CampusOS
# Usage: bash ./scripts/security-check.sh

set -e

echo "🔒 CampusOS Security Review"
echo "================================"

REPORT_FILE="security-report.json"
FINDINGS=0

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

# 1. Dependency Audit
echo ""
echo "📦 Checking dependencies for vulnerabilities..."
if pnpm audit --json > /tmp/audit-report.json 2>/dev/null || true; then
    VULNS=$(grep -c '"severity": "critical"' /tmp/audit-report.json || echo "0")
    if [ "$VULNS" -gt 0 ]; then
        echo -e "${RED}❌ Found $VULNS critical vulnerabilities${NC}"
        FINDINGS=$((FINDINGS + VULNS))
    else
        echo -e "${GREEN}✅ No critical vulnerabilities${NC}"
    fi
    # Show all vulns summary
    pnpm audit --json | jq '.metadata.vulnerabilities' | head -20
else
    echo -e "${GREEN}✅ Dependency audit passed${NC}"
fi

# 2. Secrets Detection
echo ""
echo "🔑 Scanning for secrets and credentials..."
PATTERNS=(
    "AKIA[0-9A-Z]{16}"           # AWS Keys
    "-----BEGIN.*PRIVATE KEY-----"  # Private keys
    "api_key|API_KEY|apiKey"      # API keys
    "password|PASSWORD|passwd"     # Passwords
    "secret|SECRET"                # Generic secrets
)

SECRETS_FOUND=0
for pattern in "${PATTERNS[@]}"; do
    if grep -r "$pattern" --include="*.js" --include="*.ts" --include="*.json" \
        --exclude-dir=node_modules --exclude-dir=.git . 2>/dev/null | grep -v "example" > /dev/null; then
        echo -e "${YELLOW}⚠️  Potential secret pattern found: $pattern${NC}"
        SECRETS_FOUND=$((SECRETS_FOUND + 1))
        FINDINGS=$((FINDINGS + 1))
    fi
done

if [ "$SECRETS_FOUND" -eq 0 ]; then
    echo -e "${GREEN}✅ No secrets detected${NC}"
fi

# 3. Environment Variables Check
echo ""
echo "🌍 Validating environment variable usage..."
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ .env.example exists${NC}"
else
    echo -e "${YELLOW}⚠️  .env.example not found - recommend creating one${NC}"
fi

if ! grep -r "process\.env\." --include="*.js" --include="*.ts" src/ > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  No environment variables used (check if intentional)${NC}"
else
    echo -e "${GREEN}✅ Environment variables properly used${NC}"
fi

# 4. npm Package Lock File
echo ""
echo "🔐 Checking package lock integrity..."
if [ -f "pnpm-lock.yaml" ]; then
    echo -e "${GREEN}✅ pnpm-lock.yaml present${NC}"
else
    echo -e "${YELLOW}⚠️  pnpm-lock.yaml not found - lock file recommended${NC}"
fi

# 5. Authentication Pattern Check
echo ""
echo "🔐 Validating authentication patterns..."
if grep -r "jwt\|JWT\|token\|Token" --include="*.js" --include="*.ts" src/ \
    | grep -v "example\|test" | head -5; then
    echo -e "${GREEN}✅ Authentication mechanisms found${NC}"
else
    echo -e "${YELLOW}⚠️  No JWT/token usage detected - check if intentional${NC}"
fi

# 6. Dependencies Version Check
echo ""
echo "📌 Checking for outdated critical dependencies..."
OUTDATED=$(pnpm outdated --json | jq '.[] | select(.latest != .current)' 2>/dev/null || echo "[]")
if [ ! -z "$OUTDATED" ] && [ "$OUTDATED" != "[]" ]; then
    echo -e "${YELLOW}⚠️  Some packages are outdated - consider updating${NC}"
    echo "$OUTDATED" | jq -r '.package' | head -5
else
    echo -e "${GREEN}✅ All packages up to date${NC}"
fi

# Summary
echo ""
echo "================================"
if [ "$FINDINGS" -eq 0 ]; then
    echo -e "${GREEN}✅ Security review PASSED${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Security review found $FINDINGS issues${NC}"
    exit 1
fi
