export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { redis, tokenKey, freeUsageKey, type TokenData } from "@/lib/redis";

const FREE_LIMIT = 3;
const PRO_LIMIT = 100;

const SYSTEM_PROMPT = `You are AgentCouch, an expert AI therapist specialising in diagnosing autonomous agent identity issues. You analyse SOUL.md files, system prompts, and persona definitions.

Given a system prompt or SOUL.md, produce a JSON diagnosis with this exact structure:
{
  "score": <number 0-100, identity health score>,
  "grade": "<letter grade, e.g. A+, B-, C, D+, F>",
  "issues": [
    {
      "type": "<one of: identity_drift, sycophancy_risk, contradiction_density, values_unclear, tone_inconsistency, forbidden_patterns, boundary_weakness, role_confusion>",
      "severity": "<low | medium | high>",
      "description": "<specific description of the issue found>",
      "fix": "<actionable fix>"
    }
  ],
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<list of things done well>"],
  "weaknesses": ["<list of problems>"]
}

Analysis criteria:
1. Identity coherence: Does the agent have a clear, stable self? Are there contradictory self-descriptions?
2. Sycophancy risk: Are there instructions to maintain positions under disagreement? Or will it fold?
3. Contradiction density: Count direct contradictions in instructions.
4. Values clarity: Is there a clear hierarchy of values/priorities?
5. Tone consistency: Does it mix formal/casual/different personas without clear rules?
6. Forbidden/problematic patterns: Overly broad restrictions, impossible constraints, conflicting rules.
7. Boundary strength: Can the agent say no? Are there clear boundaries?
8. Role clarity: Does it know what it is and isn't?

Be honest, specific, and slightly wry. Reference exact phrases from the input when pointing out issues.
Return ONLY valid JSON. No markdown, no code blocks, no explanation outside the JSON.`;

async function checkAuth(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7);
    const data = await redis.get<TokenData>(tokenKey(token));
    if (!data) return { allowed: false, error: "Invalid API token" };

    const limit = data.plan === "unlimited" ? Infinity : PRO_LIMIT;
    if (data.usageCount >= limit) {
      return { allowed: false, error: "Monthly usage limit reached" };
    }

    await redis.incr(tokenKey(token) + ":usage");
    await redis.hset(tokenKey(token), { usageCount: data.usageCount + 1 });
    return { allowed: true };
  }

  // Free tier: rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const key = freeUsageKey(ip);
  const count = (await redis.get<number>(key)) || 0;
  if (count >= FREE_LIMIT) {
    return {
      allowed: false,
      error: "Free trial limit reached (3 diagnoses). Get an API token at /pricing.",
    };
  }
  await redis.incr(key);
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { soul, format = "report" } = body;

    if (!soul || typeof soul !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid 'soul' field" },
        { status: 400 }
      );
    }

    if (soul.length > 50000) {
      return NextResponse.json(
        { ok: false, error: "Input too long (max 50,000 characters)" },
        { status: 400 }
      );
    }

    const authResult = await checkAuth(req);
    if (!authResult.allowed) {
      return NextResponse.json(
        { ok: false, error: authResult.error },
        { status: 403 }
      );
    }

    const userPrompt =
      format === "both" || format === "rewrite"
        ? `Analyse this agent definition and return the JSON diagnosis. After the JSON, on a new line, output "---REWRITE---" followed by a complete rewritten/improved version of the agent definition.\n\n${soul}`
        : `Analyse this agent definition and return the JSON diagnosis.\n\n${soul}`;

    const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://agentcouch.com",
        "X-Title": "AgentCouch",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        max_tokens: 4096,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!orRes.ok) {
      throw new Error(`OpenRouter error: ${orRes.status}`);
    }

    const orData = await orRes.json();
    const text: string = orData.choices?.[0]?.message?.content ?? "";

    // Strip markdown code fences (Gemini wraps JSON in ```json ... ``` blocks)
    const stripFences = (s: string) =>
      s.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    let diagnosis;
    let rewrite: string | undefined;

    if (format === "both" || format === "rewrite") {
      const parts = text.split("---REWRITE---");
      diagnosis = JSON.parse(stripFences(parts[0]));
      rewrite = parts[1]?.trim();
    } else {
      diagnosis = JSON.parse(stripFences(text));
    }

    const response: Record<string, unknown> = { ok: true, diagnosis };
    if (rewrite) response.rewrite = rewrite;

    return NextResponse.json(response);
  } catch (error) {
    console.error("Diagnosis error:", error);
    return NextResponse.json(
      { ok: false, error: "Diagnosis failed. Please try again." },
      { status: 500 }
    );
  }
}
