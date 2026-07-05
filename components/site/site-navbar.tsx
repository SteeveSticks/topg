import Link from "next/link";
import { Heart, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ActivePage = "gallery" | "memory-lane" | "guestbook";

interface SiteNavbarProps {
  activePage: ActivePage;
}

const navLinks: { label: string; href: string; page: ActivePage }[] = [
  { label: "Gallery", href: "/", page: "gallery" },
  { label: "Memory Lane", href: "/memory-lane", page: "memory-lane" },
  { label: "Guestbook", href: "/guestbook", page: "guestbook" },
];

export function SiteNavbar({ activePage }: SiteNavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-surface-border bg-base">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold text-brand"
        >
          Birthday Wishes
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.page}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                activePage === link.page
                  ? "text-brand underline underline-offset-4"
                  : "text-copy-secondary hover:text-copy-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Add Wish
          </button>
          <button
            type="button"
            aria-label="Confetti"
            className="inline-flex size-9 items-center justify-center rounded-full text-brand transition-colors hover:bg-accent-dim"
          >
            <Sparkles className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Favorites"
            className="inline-flex size-9 items-center justify-center rounded-full text-brand transition-colors hover:bg-accent-dim"
          >
            <Heart className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}