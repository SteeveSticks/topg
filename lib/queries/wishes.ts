import { unstable_cache } from "next/cache";

import {
  CACHE_TAGS,
  PUBLIC_REVALIDATE_SECONDS,
} from "@/lib/cache-tags";
import { WishStatus } from "@/lib/generated/prisma/enums";
import type { WishModel } from "@/lib/generated/prisma/models/Wish";
import { prisma } from "@/lib/prisma";

export interface ApprovedWishesPage {
  items: WishModel[];
  nextCursor: string | null;
}

const getApprovedWishesWithPhotosCached = unstable_cache(
  async () => {
    return prisma.wish.findMany({
      where: {
        status: WishStatus.APPROVED,
        photoUrl: { not: null },
      },
      orderBy: { createdAt: "desc" },
    });
  },
  ["approved-wishes-with-photos"],
  {
    tags: [CACHE_TAGS.wishes, CACHE_TAGS.gallery],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export async function getApprovedWishesWithPhotos() {
  return getApprovedWishesWithPhotosCached();
}

/**
 * Lightweight home-gallery helper: only photo URLs for approved wishes.
 */
const getApprovedWishPhotoUrlsCached = unstable_cache(
  async (take: number) => {
    const wishes = await prisma.wish.findMany({
      where: {
        status: WishStatus.APPROVED,
        photoUrl: { not: null },
      },
      orderBy: { createdAt: "desc" },
      take,
      select: { photoUrl: true },
    });

    return wishes
      .map((wish) => wish.photoUrl)
      .filter((url): url is string => Boolean(url));
  },
  ["approved-wish-photo-urls"],
  {
    tags: [CACHE_TAGS.wishes, CACHE_TAGS.gallery],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export async function getApprovedWishPhotoUrls(options?: { take?: number }) {
  const take = options?.take ?? 6;
  return getApprovedWishPhotoUrlsCached(take);
}

const getApprovedWishesCached = unstable_cache(
  async (cursor: string | null, take: number): Promise<ApprovedWishesPage> => {
    const wishes = await prisma.wish.findMany({
      where: { status: WishStatus.APPROVED },
      orderBy: { createdAt: "desc" },
      take: take + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });

    const hasMore = wishes.length > take;
    const items = hasMore ? wishes.slice(0, take) : wishes;
    const nextCursor = hasMore ? items[items.length - 1]?.id ?? null : null;

    return { items, nextCursor };
  },
  ["approved-wishes"],
  {
    tags: [CACHE_TAGS.wishes],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export async function getApprovedWishes(options?: {
  cursor?: string;
  take?: number;
}) {
  const take = options?.take ?? 6;
  const cursor = options?.cursor ?? null;

  return getApprovedWishesCached(cursor, take);
}
