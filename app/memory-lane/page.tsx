import { MemoryLaneHero } from "@/components/site/memory-lane-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";
import { Timeline } from "@/components/site/timeline";
import { TimelineClosingCta } from "@/components/site/timeline-closing-cta";
import { getGalleryImages } from "@/lib/gallery-images";
import { toNextImageSrc } from "@/lib/image-url";
import { getTimelineEntries } from "@/lib/queries/timeline";

export const revalidate = 60;

export default async function MemoryLanePage() {
  const [entries, galleryImages] = await Promise.all([
    getTimelineEntries(),
    getGalleryImages(),
  ]);

  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar activePage="memory-lane" />
      <main className="mx-auto max-w-6xl pt-16">
        <MemoryLaneHero
          imageUrls={galleryImages.map((item) => item.imageUrl)}
        />
        {entries.length === 0 ? (
          <p className="px-6 py-16 text-center text-base text-copy-secondary">
            No timeline entries have been added yet.
          </p>
        ) : (
          <Timeline
            entries={entries.map((entry) => ({
              id: entry.id,
              title: entry.title,
              description: entry.description,
              imageUrl: toNextImageSrc(entry.photoUrl),
            }))}
          />
        )}
        <TimelineClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
