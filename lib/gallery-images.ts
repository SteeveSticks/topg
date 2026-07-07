import { toNextImageSrc } from "@/lib/image-url";
import { getSite } from "@/lib/queries/site";
import { getApprovedWishesWithPhotos } from "@/lib/queries/wishes";
import { getTimelineEntries } from "@/lib/queries/timeline";

export interface GalleryImageItem {
  id: string;
  source: "site" | "timeline" | "wish";
  caption: string;
  imageUrl: string;
}

export async function getGalleryImages(): Promise<GalleryImageItem[]> {
  const [site, timelineEntries, wishes] = await Promise.all([
    getSite(),
    getTimelineEntries(),
    getApprovedWishesWithPhotos(),
  ]);

  const items: GalleryImageItem[] = [];

  if (site?.heroPhotoUrl) {
    items.push({
      id: site.id,
      source: "site",
      caption: site.honoreeName,
      imageUrl: toNextImageSrc(site.heroPhotoUrl),
    });
  }

  for (const entry of timelineEntries) {
    if (entry.photoUrl) {
      items.push({
        id: entry.id,
        source: "timeline",
        caption: entry.title,
        imageUrl: toNextImageSrc(entry.photoUrl),
      });
    }
  }

  for (const wish of wishes) {
    if (wish.photoUrl) {
      items.push({
        id: wish.id,
        source: "wish",
        caption: wish.authorName,
        imageUrl: toNextImageSrc(wish.photoUrl),
      });
    }
  }

  return items;
}