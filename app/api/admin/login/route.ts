import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { jsonError, rateLimitResponse } from "@/lib/api-response";
import {
  createSessionToken,
  getSessionCookieOptions,
} from "@/lib/admin-session";
import { checkRateLimit } from "@/lib/rate-limit";

const LOGIN_COOLDOWN_MS = 60_000;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as { password?: unknown }).password !== "string"
  ) {
    return jsonError("password is required", 400);
  }

  const { password } = body as { password: string };

  const ip = await getClientIp();
  const rateLimit = checkRateLimit(`admin-login:${ip}`, LOGIN_COOLDOWN_MS);

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.retryAfterMs ?? LOGIN_COOLDOWN_MS);
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return jsonError("Invalid password", 401);
  }

  let token: string;

  try {
    token = createSessionToken();
  } catch {
    return jsonError("Server configuration error", 500);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(getSessionCookieOptions(token));

  return response;
}