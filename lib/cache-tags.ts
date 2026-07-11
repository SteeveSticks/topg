import { revalidatePath, revalidateTag } from "next/cache";

/** Shared cache tags for public read data (unstable_cache / revalidateTag). */
export const CACHE_TAGS = {
  site: "site",
  wishes: "wishes",
  timeline: "timeline",
  gallery: "gallery",
} as const;

/** Default time-based revalidation for public Prisma reads (seconds). */
export const PUBLIC_REVALIDATE_SECONDS = 60;

/**
 * Stale-while-revalidate invalidation (Next.js 16 two-arg form).
 * Call after admin mutations that change public content.
 */
export function revalidatePublicWishes() {
  revalidateTag(CACHE_TAGS.wishes, "max");
  revalidateTag(CACHE_TAGS.gallery, "max");
  revalidatePath("/");
  revalidatePath("/guestbook");
  revalidatePath("/gallery");
  revalidatePath("/memory-lane");
}

export function revalidatePublicTimeline() {
  revalidateTag(CACHE_TAGS.timeline, "max");
  revalidateTag(CACHE_TAGS.gallery, "max");
  revalidatePath("/memory-lane");
  revalidatePath("/gallery");
}

export function revalidatePublicSite() {
  revalidateTag(CACHE_TAGS.site, "max");
  revalidateTag(CACHE_TAGS.gallery, "max");
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/memory-lane");
}
