import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Token stored as JSON string via redis.set
// Key: agentcouch:token:{token}
export interface TokenRecord {
  email: string;           // payment email
  plan: "single" | "pack";
  credits: number;         // original purchase
  remaining: number;       // current balance (decremented atomically via separate key)
  createdAt: string;
}

// Atomic credit balance key (integer string, use DECR)
// Key: agentcouch:credits:{token}
export function tokenKey(token: string)   { return `agentcouch:token:${token}`; }
export function creditsKey(token: string) { return `agentcouch:credits:${token}`; }
export function freeKey(ip: string)       { return `agentcouch:free:${ip}`; }

export const FREE_LIMIT = 3;
export const FREE_TTL   = 86400; // 24h reset
