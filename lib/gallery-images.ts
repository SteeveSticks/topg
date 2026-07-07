import { getSite } from "@/lib/queries/site";
import { getApprovedWishes } from "@/lib/queries/wishes";
import { getTimelineEntries } from "@/lib/queries/timeline";

const SLIDE_IMAGES = [
  "/slide1.jpg",
  "/slide2.jpg",
  "/slide3.webp",
  "/slide4.jpg",
  "/slide5.jpg",
  "/slide6.jpg",
] as const;

export const GALLERY_TILE_COUNT = 20;

export const GALLERY_PLACEHOLDER_IMAGES: string[] = Array.from(
  { length: GALLERY_TILE_COUNT },
  (_, index) => SLIDE_IMAGES[index % SLIDE_IMAGES.length],
);

export function getGalleryPlaceholderImage(index: number): string {
  return GALLERY_PLACEHOLDER_IMAGES[
    index % GALLERY_PLACEHOLDER_IMAGES.length
  ];
}

export interface GalleryImageItem {
  id: string;
  source: "site" | "timeline" | "wish" | "placeholder";
  caption: string;
}

export function buildGalleryDisplayItems(
  items: GalleryImageItem[],
): GalleryImageItem[] {
  return Array.from({ length: GALLERY_TILE_COUNT }, (_, index) => {
    const item = items[index];

    if (item) {
      return item;
    }

    const fallback = items[index % items.length];

    if (fallback) {
      return {
        id: `${fallback.id}-repeat-${index}`,
        source: fallback.source,
        caption: fallback.caption,
      };
    }

    return {
      id: `placeholder-${index}`,
      source: "placeholder",
      caption: `Gallery photo ${index + 1}`,
    };
  });
}

export async function getGalleryImages(): Promise<GalleryImageItem[]> {
  const [site, timelineEntries, { items: wishes }] = await Promise.all([
    getSite(),
    getTimelineEntries(),
    getApprovedWishes({ take: 50 }),
  ]);

  const items: GalleryImageItem[] = [];

  if (site?.heroPhotoUrl) {
    items.push({
      id: site.id,
      source: "site",
      caption: site.honoreeName,
    });
  }

  for (const entry of timelineEntries) {
    if (entry.photoUrl) {
      items.push({
        id: entry.id,
        source: "timeline",
        caption: entry.title,
      });
    }
  }

  for (const wish of wishes) {
    if (wish.photoUrl) {
      items.push({
        id: wish.id,
        source: "wish",
        caption: wish.authorName,
      });
    }
  }

  return items;
}