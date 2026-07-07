import Link from "next/link";
import { Cake } from "lucide-react";

export function TimelineClosingCta() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-2xl rounded-2xl bg-subtle px-8 py-12 text-center">
        <Cake
          className="mx-auto mb-4 h-8 w-8 text-brand"
          strokeWidth={1.75}
        />
        <h2 className="mb-3 text-2xl font-bold text-copy-primary md:text-3xl">
          And Many More…
        </h2>
        <p className="mb-8 text-base leading-relaxed text-copy-secondary">
          The best is yet to come. Every birthday adds another chapter — and
          we cannot wait to celebrate the next one with you.
        </p>
        <Link
          href="/gallery"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          View Full Gallery
        </Link>
      </div>
    </section>
  );
}