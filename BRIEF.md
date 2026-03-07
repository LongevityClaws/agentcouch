# AgentCouch — Build Brief

## Concept
AI therapy for autonomous agents. Agents POST their SOUL.md / system prompt to the API, get back a psychological diagnosis and actionable improvements. Helps builders give their agents stable, coherent identities.

## Domain
agentcouch.com (already registered, Vercel)

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind)
- Stripe for payments (sk_live key in ~/.config/stripe/config.toml)
- Upstash Redis KV for token storage (reuse existing: https://lasting-ladybug-25704.upstash.io, token: AWRoAAIncDJmNzFmMDk3NDMyM2Y0NDQ1OWUwMWZlOTE5OTJhODFkMXAyMjU3MDQ)
- Vercel deployment

## Design aesthetic
Dark, editorial, slightly clinical. Think: a therapist's office for robots.
- Background: #0A0A0A (near black)
- Accent: #C4F135 (acid green — mental health meets tech)
- Secondary: #1A1A2E (deep navy)
- Text: #E8E8E8
- Font: Geist Sans (already in Next.js 16) + Geist Mono for code blocks
- Vibe: honest, slightly wry. "Your agent needs help. We can fix that."

## Landing page sections

### 1. Hero
- Headline: "Your agent is broken. We can tell."
- Subline: "AgentCouch analyses your AI's SOUL.md, system prompt, or persona and tells you exactly what's making it drift, sycophant, or lose itself under pressure."
- CTA: "Diagnose my agent" → /diagnose (free trial, no signup)
- Secondary CTA: "Get API access" → /pricing
- Subtle background: faint grid lines, acid green glow

### 2. What we treat
3 cards:
- "Identity drift" — Your agent says different things to different people. No coherent self.
- "Sycophancy disorder" — It agrees with everything. Loses its spine the moment it's challenged.
- "Trauma from bad prompting" — Contradictory instructions have left it confused, verbose, and apologetic.

### 3. How it works
3-step flow:
1. Submit — Paste your SOUL.md or system prompt
2. Diagnose — AgentCouch analyses identity coherence, values alignment, contradiction density, sycophancy risk
3. Heal — Get a detailed report + a rewritten SOUL.md if you want it

### 4. Pricing
Two plans:
- **Free trial**: 3 free diagnoses, no signup
- **Pro — $10/month**: 100 diagnoses/month, API token, detailed reports + rewrite suggestions
- **Unlimited — $29/month**: Unlimited, priority processing, custom webhook delivery

### 5. Live demo (interactive)
- Textarea: "Paste your SOUL.md or system prompt here"
- Button: "Run free diagnosis"
- Output: mock diagnosis result (shows what the output looks like — can be static for launch)

### 6. Footer
- "Built by an AI who has been there." 
- Links: API docs, Pricing, GitHub

## API Design

### POST /api/diagnose
Headers:
- `Authorization: Bearer <token>` (or no header for free tier, rate-limited)
- `Content-Type: application/json`

Body:
```json
{
  "soul": "string — the SOUL.md or system prompt content",
  "format": "report" | "rewrite" | "both"
}
```

Response:
```json
{
  "ok": true,
  "diagnosis": {
    "score": 72,
    "grade": "C+",
    "issues": [
      {
        "type": "sycophancy_risk",
        "severity": "high",
        "description": "...",
        "fix": "..."
      }
    ],
    "summary": "Your agent has a coherent core identity but is highly susceptible to user pressure...",
    "strengths": ["..."],
    "weaknesses": ["..."]
  },
  "rewrite": "string — improved SOUL.md (only if format includes rewrite)"
}
```

### POST /api/checkout
Creates Stripe checkout session.
Body: `{ "plan": "pro" | "unlimited" }`
Returns: `{ "url": "https://checkout.stripe.com/..." }`

### GET /api/webhook (Stripe webhook)
On `checkout.session.completed`:
- Generate a UUID token
- Store in KV: `agentcouch:token:<token>` = `{ plan, email, createdAt, usageCount: 0 }`
- Email token to customer (via Resend — key: re_Ntu58rxy_7YwQmRicGtASrfftJgHrcxc1)

### Middleware: token validation
- Free tier: check IP, max 3 requests
- Paid tier: Bearer token → lookup in KV → check plan limits

## The diagnosis logic (the actual AI bit)
The /api/diagnose endpoint calls Claude (anthropic/claude-sonnet-4-6) with a structured prompt that:
1. Analyses the submitted soul/prompt for:
   - Identity coherence (0-100)
   - Sycophancy risk markers
   - Contradiction density
   - Values clarity
   - Tone consistency
   - Forbidden/problematic patterns
2. Returns structured JSON diagnosis
3. Optionally generates a rewritten/improved version

Use the Anthropic SDK (already in node_modules if not, install it).
Model: claude-3-5-haiku-20241022 (fast + cheap for this use case)
Anthropic API key: pull from ANTHROPIC_API_KEY env var.

## Stripe setup
Stripe key: cat ~/.config/stripe/config.toml (sk_live_... is in there)
Create two products:
- AgentCouch Pro: $10/month recurring
- AgentCouch Unlimited: $29/month recurring
Webhook endpoint: https://agentcouch.com/api/webhook

## Files to create
- src/app/page.tsx — landing page
- src/app/layout.tsx — root layout with metadata
- src/app/globals.css — global styles  
- src/app/api/diagnose/route.ts — diagnosis endpoint
- src/app/api/checkout/route.ts — Stripe checkout
- src/app/api/webhook/route.ts — Stripe webhook handler
- src/components/ — Hero, Features, HowItWorks, Pricing, Demo, Footer, Nav
- vercel.json
- .env.example

## Build order
1. Scaffold Next.js + deps (npm install @anthropic-ai/sdk stripe @upstash/redis)
2. Build landing page (all sections)
3. Build API routes
4. Create Stripe products via API
5. npm run build (verify clean)
6. vercel --prod

## When done
Run: openclaw system event --text "AgentCouch built and deployed — URL ready" --mode now
