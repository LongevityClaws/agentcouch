import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export interface TokenData {
  plan: "pro" | "unlimited";
  email: string;
  createdAt: string;
  usageCount: number;
}

export function tokenKey(token: string) {
  return `agentcouch:token:${token}`;
}

export function freeUsageKey(ip: string) {
  return `agentcouch:free:${ip}`;
}
