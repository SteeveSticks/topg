import { notFound } from "next/navigation";

import { HeroSection } from "@/components/site/hero-section";
import { LatestWishesSection } from "@/components/site/latest-wishes-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";
import { toNextImageSrc } from "@/lib/image-url";
import { getSite } from "@/lib/queries/site";
import { getApprovedWishPhotoUrls } from "@/lib/queries/wishes";

export const revalidate = 60;

function toIsoString(value: Date | string): string {
  return typeof value === "string" ? value : value.toISOString();
}

export default async function Home() {
  const [site, photoUrls] = await Promise.all([
    getSite(),
    getApprovedWishPhotoUrls({ take: 6 }),
  ]);

  if (!site) {
    notFound();
  }

  const wishImageUrls = photoUrls.map((url) => toNextImageSrc(url));

  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 pt-16">
        <HeroSection
          honoreeName={site.honoreeName}
          photoUrl={toNextImageSrc(site.heroPhotoUrl)}
          subtitle={site.pageCopy}
          countdownTarget={toIsoString(site.countdownTarget)}
        />
        <LatestWishesSection imageUrls={wishImageUrls} />
      </main>
      <SiteFooter />
    </div>
  );
}
