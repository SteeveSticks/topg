import { NextResponse } from "next/server";
import { getSessionCookieOptions } from "@/lib/admin-session";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(getSessionCookieOptions());

  return response;
}