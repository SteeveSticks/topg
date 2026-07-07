import { notFound } from "next/navigation";

import { HeroSection } from "@/components/site/hero-section";
import { LatestWishesSection } from "@/components/site/latest-wishes-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";
import { toNextImageSrc } from "@/lib/image-url";
import { getSite } from "@/lib/queries/site";
import { getApprovedWishes } from "@/lib/queries/wishes";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [site, { items: wishes }] = await Promise.all([
    getSite(),
    getApprovedWishes({ take: 50 }),
  ]);

  const wishImageUrls = wishes
    .filter((wish) => wish.photoUrl)
    .map((wish) => toNextImageSrc(wish.photoUrl as string));

  if (!site) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 pt-16">
        <HeroSection
          honoreeName={site.honoreeName}
          photoUrl={toNextImageSrc(site.heroPhotoUrl)}
          subtitle={site.pageCopy}
          countdownTarget={site.countdownTarget.toISOString()}
        />
        <LatestWishesSection imageUrls={wishImageUrls} />
      </main>
      <SiteFooter />
    </div>
  );
}