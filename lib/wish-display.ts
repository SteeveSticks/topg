import type { WishModel } from "@/lib/generated/prisma/models/Wish";
import type { WishCardProps } from "@/components/site/wish-card";
import { toNextImageSrc } from "@/lib/image-url";
import { getVideoThumbnailUrl } from "@/lib/video-url";

export function formatGuestbookDate(date: Date): string {
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

export function wishToGuestbookMessage(wish: WishModel) {
  return {
    id: wish.id,
    message: wish.message,
    author: wish.authorName,
    date: formatGuestbookDate(wish.createdAt),
    state: "visible" as const,
  };
}

export function wishToWishCardProps(
  wish: WishModel,
  index: number,
): WishCardProps {
  if (wish.photoUrl) {
    return {
      variant: "photo",
      caption: wish.message,
      author: wish.authorName,
      imageUrl: toNextImageSrc(wish.photoUrl),
    };
  }

  if (wish.videoUrl) {
    return {
      variant: "video",
      caption: wish.message,
      author: wish.authorName,
      imageUrl: getVideoThumbnailUrl(wish.videoUrl),
      duration: "Video",
    };
  }

  return {
    variant: "message",
    message: wish.message,
    author: wish.authorName,
    colorTheme: index % 2 === 0 ? "peach" : "teal",
  };
}