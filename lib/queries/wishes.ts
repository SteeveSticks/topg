import { WishStatus } from "@/lib/generated/prisma/enums";
import type { WishModel } from "@/lib/generated/prisma/models/Wish";
import { prisma } from "@/lib/prisma";

export interface ApprovedWishesPage {
  items: WishModel[];
  nextCursor: string | null;
}

export async function getApprovedWishes(options?: {
  cursor?: string;
  take?: number;
}) {
  const take = options?.take ?? 6;

  const wishes = await prisma.wish.findMany({
    where: { status: WishStatus.APPROVED },
    orderBy: { createdAt: "desc" },
    take: take + 1,
    ...(options?.cursor
      ? { cursor: { id: options.cursor }, skip: 1 }
      : {}),
  });

  const hasMore = wishes.length > take;
  const items = hasMore ? wishes.slice(0, take) : wishes;
  const nextCursor = hasMore ? items[items.length - 1]?.id ?? null : null;

  return { items, nextCursor };
}