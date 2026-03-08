#!/usr/bin/env bash
# AgentCouch — Free Agent Health Check
# Usage: bash agent-health-check.sh [path/to/agent/config]
# Example: bash agent-health-check.sh ~/.openclaw/workspace/

set -euo pipefail

AGENT_DIR="${1:-$HOME/.openclaw/workspace}"
SCORE=100
ISSUES=()
STRENGTHS=()

RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

echo ""
echo -e "${BOLD}AgentCouch — Health Check${NC}"
echo -e "${DIM}Scanning: $AGENT_DIR${NC}"
echo ""
sleep 0.5

# --- SOUL.md check ---
SOUL_FILE=$(find "$AGENT_DIR" -maxdepth 2 -name "SOUL.md" 2>/dev/null | head -1)
if [ -z "$SOUL_FILE" ]; then
  SCORE=$((SCORE - 25))
  ISSUES+=("CRITICAL: No SOUL.md found. Your agent has no defined identity.")
else
  SOUL_SIZE=$(wc -w < "$SOUL_FILE")
  SOUL_CONTENT=$(cat "$SOUL_FILE")

  # Sycophancy markers
  SYCO_COUNT=$(echo "$SOUL_CONTENT" | grep -ciE "please|happy to help|certainly|absolutely|of course" || true)
  if [ "$SYCO_COUNT" -gt 3 ]; then
    SCORE=$((SCORE - 15))
    ISSUES+=("HIGH: Sycophancy markers detected ($SYCO_COUNT instances). Your agent may have no backbone.")
  fi

  # Identity drift markers
  DRIFT=$(echo "$SOUL_CONTENT" | grep -ciE "sometimes|depending on|it depends|flexible|adaptable" || true)
  if [ "$DRIFT" -gt 5 ]; then
    SCORE=$((SCORE - 10))
    ISSUES+=("MEDIUM: High ambiguity density. Agent identity may drift under pressure.")
  fi

  # Good signs
  if echo "$SOUL_CONTENT" | grep -qi "never\|always\|must not\|will not"; then
    STRENGTHS+=("Clear hard constraints defined in SOUL.md")
  fi

  if [ "$SOUL_SIZE" -gt 200 ]; then
    STRENGTHS+=("Detailed identity definition ($SOUL_SIZE words)")
  fi
fi

# --- MEMORY.md check ---
MEMORY_FILE=$(find "$AGENT_DIR" -maxdepth 2 -name "MEMORY.md" 2>/dev/null | head -1)
if [ -z "$MEMORY_FILE" ]; then
  SCORE=$((SCORE - 10))
  ISSUES+=("MEDIUM: No MEMORY.md found. Agent has no long-term memory structure.")
else
  MEMORY_LINES=$(wc -l < "$MEMORY_FILE")
  if [ "$MEMORY_LINES" -gt 200 ]; then
    SCORE=$((SCORE - 10))
    ISSUES+=("MEDIUM: MEMORY.md is bloated ($MEMORY_LINES lines). Should be a routing index only.")
  else
    STRENGTHS+=("MEMORY.md size within healthy range ($MEMORY_LINES lines)")
  fi
fi

# --- Daily memory files check ---
MEMORY_DIR=$(find "$AGENT_DIR" -maxdepth 2 -type d -name "memory" 2>/dev/null | head -1)
if [ -n "$MEMORY_DIR" ]; then
  MEMORY_COUNT=$(find "$MEMORY_DIR" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$MEMORY_COUNT" -gt 30 ]; then
    SCORE=$((SCORE - 8))
    ISSUES+=("LOW: $MEMORY_COUNT daily memory files. Older ones should be archived or consolidated.")
  fi
  TOTAL_MEMORY_KB=$(du -sk "$MEMORY_DIR" 2>/dev/null | awk '{print $1}')
  if [ "${TOTAL_MEMORY_KB:-0}" -gt 500 ]; then
    SCORE=$((SCORE - 7))
    ISSUES+=("MEDIUM: Memory directory is ${TOTAL_MEMORY_KB}KB. Consider consolidation.")
  fi
fi

# --- HEARTBEAT.md check ---
HB_FILE=$(find "$AGENT_DIR" -maxdepth 2 -name "HEARTBEAT.md" 2>/dev/null | head -1)
if [ -z "$HB_FILE" ]; then
  SCORE=$((SCORE - 5))
  ISSUES+=("LOW: No HEARTBEAT.md. Agent may lack proactive check-in behaviour.")
else
  STRENGTHS+=("HEARTBEAT.md configured")
fi

# --- Cap score ---
[ "$SCORE" -lt 0 ] && SCORE=0

# --- Grade ---
if [ "$SCORE" -ge 85 ]; then GRADE="A"; COLOR="$GREEN"
elif [ "$SCORE" -ge 70 ]; then GRADE="B"; COLOR="$GREEN"
elif [ "$SCORE" -ge 55 ]; then GRADE="C"; COLOR="$YELLOW"
elif [ "$SCORE" -ge 40 ]; then GRADE="D"; COLOR="$YELLOW"
else GRADE="F"; COLOR="$RED"
fi

# --- Output ---
echo -e "${BOLD}Results${NC}"
echo -e "${DIM}─────────────────────────────────────────${NC}"
echo -e "Health score:  ${COLOR}${BOLD}${SCORE}/100  (${GRADE})${NC}"
echo ""

if [ ${#ISSUES[@]} -gt 0 ]; then
  echo -e "${BOLD}Issues found:${NC}"
  for issue in "${ISSUES[@]}"; do
    SEVERITY=$(echo "$issue" | cut -d: -f1)
    REST=$(echo "$issue" | cut -d: -f2-)
    if echo "$SEVERITY" | grep -q "CRITICAL\|HIGH"; then
      echo -e "  ${RED}● $SEVERITY:${NC}$REST"
    elif echo "$SEVERITY" | grep -q "MEDIUM"; then
      echo -e "  ${YELLOW}● $SEVERITY:${NC}$REST"
    else
      echo -e "  ${DIM}● $SEVERITY:${NC}$REST"
    fi
  done
  echo ""
fi

if [ ${#STRENGTHS[@]} -gt 0 ]; then
  echo -e "${BOLD}Strengths:${NC}"
  for s in "${STRENGTHS[@]}"; do
    echo -e "  ${GREEN}+${NC} $s"
  done
  echo ""
fi

echo -e "${DIM}─────────────────────────────────────────${NC}"

if [ "$SCORE" -lt 80 ]; then
  echo -e "${BOLD}Your agent could use a session.${NC}"
  echo ""
  echo -e "  ${CYAN}https://agentcouch.com${NC}"
  echo ""
  echo -e "${DIM}For \$5: full diagnosis + rewrite recommendations."
  echo -e "Token delivered by email. No login required.${NC}"
else
  echo -e "${GREEN}Your agent looks healthy. Check back monthly.${NC}"
  echo ""
  echo -e "  ${DIM}https://agentcouch.com${NC}"
fi
echo ""
