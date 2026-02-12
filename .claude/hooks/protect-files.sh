#!/bin/bash
# Protect sensitive files from accidental modification
PROTECTED_PATTERNS=(
  ".env"
  ".env.local"
  ".env.production"
  "pnpm-lock.yaml"
  ".git/"
  "credentials"
  "*.key"
  "*.pem"
)

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if echo "$1" | grep -q "$pattern"; then
    echo "BLOCKED: Cannot modify protected file matching pattern: $pattern"
    exit 1
  fi
done
