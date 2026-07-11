import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";

interface PageLoadingSkeletonProps {
  activePage?: "gallery" | "memory-lane" | "guestbook";
  /** Taller hero block for memory-lane style pages. */
  tallHero?: boolean;
}

export function PageLoadingSkeleton({
  activePage,
  tallHero = false,
}: PageLoadingSkeletonProps) {
  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar activePage={activePage} />
      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
        <div
          className={
            tallHero
              ? "mx-2 mb-4 h-[50vh] animate-pulse rounded-3xl bg-subtle"
              : "mx-auto mb-10 mt-8 h-40 max-w-md animate-pulse rounded-2xl bg-subtle"
          }
          aria-hidden
        />
        <div className="space-y-4" aria-busy="true" aria-live="polite">
          <div className="h-4 w-1/3 animate-pulse rounded bg-subtle" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-subtle" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-subtle" />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square animate-pulse rounded-2xl bg-subtle"
              />
            ))}
          </div>
        </div>
        <span className="sr-only">Loading page…</span>
      </main>
      <SiteFooter />
    </div>
  );
}
