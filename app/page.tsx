import { HeroSection } from "@/components/site/hero-section";
import { LatestWishesSection } from "@/components/site/latest-wishes-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar activePage="gallery" />
      <main className="mx-auto max-w-6xl pt-16 px-6">
        <HeroSection
          honoreeName="David"
          photoUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
          subtitle="Let's celebrate another trip around the sun. We've gathered wishes, memories, and love from everyone who thinks you're amazing."
          countdownTarget="2026-07-08T17:00:00"
        />
        <LatestWishesSection />
      </main>
      <SiteFooter />
    </div>
  );
}