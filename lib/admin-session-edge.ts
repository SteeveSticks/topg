import { ADMIN_SESSION_COOKIE } from "@/lib/admin-session-constants";

interface SessionPayload {
  admin: true;
  exp: number;
}

function getSessionSecret(): string | null {
  return process.env.SESSION_SECRET ?? null;
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToString(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

async function signPayload(
  encodedPayload: string,
  secret: string,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(encodedPayload),
  );

  return arrayBufferToBase64Url(signature);
}

export async function verifySessionTokenEdge(token: string): Promise<boolean> {
  try {
    const secret = getSessionSecret();

    if (!secret) {
      return false;
    }

    const [encodedPayload, signature] = token.split(".");

    if (!encodedPayload || !signature) {
      return false;
    }

    const expectedSignature = await signPayload(encodedPayload, secret);

    if (!timingSafeEqualString(signature, expectedSignature)) {
      return false;
    }

    const payload = JSON.parse(
      base64UrlToString(encodedPayload),
    ) as SessionPayload;

    if (payload.admin !== true || typeof payload.exp !== "number") {
      return false;
    }

    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export { ADMIN_SESSION_COOKIE };