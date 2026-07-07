interface RateLimitResult {
  allowed: boolean;
  retryAfterMs?: number;
}

const lastRequestByKey = new Map<string, number>();

export function checkRateLimit(
  key: string,
  cooldownMs: number,
): RateLimitResult {
  const now = Date.now();
  const lastRequest = lastRequestByKey.get(key);

  if (lastRequest !== undefined && now - lastRequest < cooldownMs) {
    return {
      allowed: false,
      retryAfterMs: cooldownMs - (now - lastRequest),
    };
  }

  lastRequestByKey.set(key, now);
  return { allowed: true };
}