import { getClientIp } from "@/lib/client-ip";
import {
  jsonError,
  rateLimitResponse,
  zodErrorResponse,
} from "@/lib/api-response";
import { WishStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getApprovedWishes } from "@/lib/queries/wishes";
import { checkRateLimit } from "@/lib/rate-limit";
import { createWishSchema } from "@/lib/schemas/create-wish";

const WISH_COOLDOWN_MS = 60_000;
const DEFAULT_TAKE = 6;
const MAX_TAKE = 50;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor") ?? undefined;
  const takeParam = searchParams.get("take");
  const parsedTake = takeParam ? Number.parseInt(takeParam, 10) : DEFAULT_TAKE;
  const take = Number.isFinite(parsedTake)
    ? Math.min(Math.max(parsedTake, 1), MAX_TAKE)
    : DEFAULT_TAKE;

  const { items, nextCursor } = await getApprovedWishes({ cursor, take });

  return Response.json({ items, nextCursor });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = createWishSchema.safeParse(body);

  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const ip = await getClientIp();
  const rateLimit = checkRateLimit(`wish:${ip}`, WISH_COOLDOWN_MS);

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.retryAfterMs ?? WISH_COOLDOWN_MS);
  }

  const wish = await prisma.wish.create({
    data: {
      authorName: parsed.data.authorName,
      relationship: parsed.data.relationship,
      message: parsed.data.message,
      photoUrl: parsed.data.photoUrl,
      videoUrl: parsed.data.videoUrl,
      status: WishStatus.PENDING,
    },
  });

  return Response.json(wish, { status: 201 });
}