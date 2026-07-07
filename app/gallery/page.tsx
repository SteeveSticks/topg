import { GalleryGrid } from "@/components/site/gallery-grid";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";
import {
  buildGalleryDisplayItems,
  getGalleryImages,
} from "@/lib/gallery-images";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const items = buildGalleryDisplayItems(await getGalleryImages());

  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar activePage="gallery" />
      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
        <section className="relative py-10 sm:py-10">
          <div className="relative text-center">
            <h1 className="text-2xl font-bold text-copy-primary sm:text-3xl md:text-4xl">
              Gallery
            </h1>
          </div>
        </section>
        <GalleryGrid items={items} />
      </main>
      <SiteFooter />
    </div>
  );
}