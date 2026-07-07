import { cookies } from "next/headers";
import { jsonError } from "@/lib/api-response";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";

export async function requireAdminSession(): Promise<Response | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token || !verifySessionToken(token)) {
    return jsonError("Unauthorized", 401);
  }

  return null;
}