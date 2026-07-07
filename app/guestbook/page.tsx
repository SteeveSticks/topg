import { GuestbookHero } from "@/components/site/guestbook-hero";
import { GuestbookLoadMore } from "@/components/site/guestbook-load-more";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";
import { getApprovedWishes } from "@/lib/queries/wishes";
import { wishToGuestbookMessage } from "@/lib/wish-display";

export const dynamic = "force-dynamic";

export default async function GuestbookPage() {
  const { items, nextCursor } = await getApprovedWishes({ take: 6 });
  const entries = items.map(wishToGuestbookMessage);

  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar activePage="guestbook" />
      <main className="mx-auto max-w-6xl pt-16">
        <GuestbookHero />
        {entries.length === 0 ? (
          <p className="px-6 pb-16 text-center text-base text-copy-secondary">
            No messages have been shared yet. Be the first to leave a wish!
          </p>
        ) : (
          <GuestbookLoadMore
            initialEntries={entries}
            initialNextCursor={nextCursor}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}