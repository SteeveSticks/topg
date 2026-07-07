import { createHmac, timingSafeEqual } from "crypto";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/admin-session-constants";

export { ADMIN_SESSION_COOKIE, SESSION_MAX_AGE_SECONDS };

interface SessionPayload {
  admin: true;
  exp: number;
}

const SESSION_MAX_AGE_MS = SESSION_MAX_AGE_SECONDS * 1000;

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured");
  }

  return secret;
}

function signPayload(encodedPayload: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createSessionToken(): string {
  const payload: SessionPayload = {
    admin: true,
    exp: Date.now() + SESSION_MAX_AGE_MS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const [encodedPayload, signature] = token.split(".");

    if (!encodedPayload || !signature) {
      return false;
    }

    const expectedSignature = signPayload(encodedPayload);
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }

    if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
      return false;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (payload.admin !== true || typeof payload.exp !== "number") {
      return false;
    }

    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function getSessionCookieOptions(token?: string) {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: token ?? "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: token ? SESSION_MAX_AGE_SECONDS : 0,
  };
}