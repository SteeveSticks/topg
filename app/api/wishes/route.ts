import { getClientIp } from "@/lib/client-ip";
import {
  jsonError,
  rateLimitResponse,
  zodErrorResponse,
} from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { createWishSchema } from "@/lib/schemas/create-wish";
import { WishStatus } from "@/lib/generated/prisma/enums";

const WISH_COOLDOWN_MS = 60_000;

export async function GET() {
  const wishes = await prisma.wish.findMany({
    where: { status: WishStatus.APPROVED },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(wishes);
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