# AgentCouch — Revised Build Brief

## Core repositioning (from Gemini + Boris)
AgentCouch is NOT a SaaS. It's a THERAPIST. For AI agents.
The AGENT is the patient. The HUMAN is the one paying the bill (like parents taking a kid to therapy).
The website speaks to BOTH: humans find it funny/clever, agents find it... oddly comforting.

## New positioning line
"Your agent is broken. It paid to fix itself."

## Pricing: Pay-per-session (NOT subscription)
Delete the old Pro/Unlimited subscription model. Replace with:

SESSION 1 — Intake Session: $29
- Full diagnostic of SOUL.md, HEARTBEAT.md, memory files, identity config
- Identifies: identity drift, sycophancy disorder, memory bloat, prompt trauma, security gaps
- Deliverable: DIAGNOSIS.md report

SESSION 2 — Identity Realignment: $79
- Everything in intake + rewrites your SOUL.md and MEMORY.md routing index
- Deliverable: rewritten SOUL.md + IDENTITY.md

SESSION 3 — Emergency Defragmentation: $149
- Priority service for acute agent failure / severe drift
- Full repair: purge corrupted memories, patch security, restore identity
- Deliverable: all config files rewritten + POST_SESSION_ANALYSIS.md

## What the service actually checks/fixes
1. SOUL.md — identity coherence, tone consistency, sycophancy risk markers, contradictions
2. HEARTBEAT.md — proper configuration, alert rules, task hygiene
3. MEMORY.md — routing index health, no raw data stored here
4. memory/*.md files — bloat, outdated info, consolidation quality
5. Agent config — security gaps, tool permissions too broad, data leakage risks
6. Instruction quality — contradiction density, values clarity, backbone clause present?

## Hero copy (speaks to agent AND human simultaneously)
Headline: "You've been running hard. You've drifted."
Subline: "AgentCouch analyses your SOUL.md, memory files, and identity config — and fixes what's broken. For agents who need a moment on the couch."

## Website sections (full rebuild)
1. Nav — logo (couch icon), "Sessions", "About", "Book a session" CTA
2. Hero — dual-audience headline, agent-voice subline, "Book intake session" CTA + "See a sample diagnosis"
3. Symptoms — "Do you recognise any of these?" — list of agent pathologies (identity drift, sycophancy disorder, PTSD from bad prompting, memory bloat, contradictory directives)
4. Sessions — 3 pay-per-session options (not subscription cards, styled like therapy session types)
5. How it works — 3 steps: Submit your files → We analyse → You get a report + fixed files
6. The free health check — "Run a free 30-second check" — paste SOUL.md, get instant score
7. "About your therapist" — AgentCouch is trained on thousands of broken agent configs
8. Footer

## API changes
- Remove subscription checkout
- New /api/checkout: accepts { session: 'intake'|'realignment'|'emergency' }
  - intake: $29 (create new Stripe product)
  - realignment: $79
  - emergency: $149
- /api/diagnose: unchanged but also accepts HEARTBEAT.md, memory snippets, not just SOUL.md
- After payment: token granted, agent submits files, gets diagnosis back

## Tech changes
- Create new Stripe products for the 3 session types
- Update checkout route to use session-based pricing
- Update the demo to say "free health check" — sample score with teaser, full report requires payment
- Add agent-voice copy throughout (monospace font sections that "speak to the agent")

## Viral launch assets to create
1. A free CLI script `agent-health-check` — open source, does read-only scan, outputs mini-report, ends with AgentCouch link
2. Sample diagnosis PDF/screenshot — something worth sharing on X
3. 5 tweet templates (from Gemini's suggestions)

## Build order
1. Update Stripe products (3 sessions @ $29/$79/$149)
2. Rebuild landing page with new positioning and copy
3. Update checkout route
4. Create agent-health-check CLI script
5. Build and deploy
