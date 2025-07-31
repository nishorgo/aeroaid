// src/lib/utils/rate-limit.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

// Make sure to add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to your .env
const redis = Redis.fromEnv();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60000 }
) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const key = `rate-limit:${ip}`;

  const current = (await redis.get<number>(key)) || 0;

  if (current >= config.maxRequests) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  await redis.setex(key, config.windowMs / 1000, current + 1);
  return null;
}