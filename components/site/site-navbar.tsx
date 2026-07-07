"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Plus, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ActivePage = "gallery" | "memory-lane" | "guestbook";

interface SiteNavbarProps {
  activePage?: ActivePage;
}

const navLinks: { label: string; href: string; page: ActivePage }[] =
  [
    {
      label: "Memory Lane",
      href: "/memory-lane",
      page: "memory-lane",
    },
    { label: "Gallery", href: "/gallery", page: "gallery" },
    { label: "Guestbook", href: "/guestbook", page: "guestbook" },
  ];

function navLinkClassName(
  activePage: ActivePage | undefined,
  page: ActivePage,
) {
  return cn(
    "text-sm font-medium transition-colors",
    activePage === page
      ? "text-brand underline underline-offset-4"
      : "text-copy-secondary hover:text-copy-primary",
  );
}

const iconButtonClassName =
  "inline-flex size-7 items-center justify-center rounded-full text-brand transition-colors hover:bg-accent-dim sm:size-8 md:size-9";

const addWishButtonClassName =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90";

export function SiteNavbar({ activePage }: SiteNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-x-hidden px-[clamp(0.5rem,4vw,1.5rem)]">
      <div className="md:mx-auto max-w-2xl! sm:max-w-6xl! border-b border-surface-border bg-base">
        <div className="flex h-14 max-w-2xl sm:max-w-6xl items-center justify-between gap-[clamp(0.25rem,1.5vw,0.75rem)] px-1 sm:h-16 sm:gap-2 sm:px-2 md:gap-3 md:px-4">
          <Link
            href="/"
            className="min-w-0 flex-1 truncate text-sm font-semibold text-brand sm:flex-none sm:text-lg"
          >
            Birthday Wishes
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                href={link.href}
                className={navLinkClassName(activePage, link.page)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5 md:gap-3">
            <Link
              href="/add-wish"
              className={cn(
                addWishButtonClassName,
                "hidden size-8 sm:inline-flex sm:size-auto sm:px-3 sm:py-2 md:px-5",
              )}
            >
              <Plus className="h-4 w-4 shrink-0" strokeWidth={2.5} />
              <span className="hidden sm:inline">Add Wish</span>
            </Link>
            <Link
              href="/add-wish"
              aria-label="Add Wish"
              className={cn(
                addWishButtonClassName,
                "inline-flex p-1.5 sm:hidden",
              )}
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <button
              type="button"
              aria-label="Confetti"
              className={cn(
                iconButtonClassName,
                "hidden sm:inline-flex",
              )}
            >
              <Sparkles
                className="h-4 w-4 sm:h-5 sm:w-5"
                strokeWidth={2}
              />
            </button>
            <button
              type="button"
              aria-label="Favorites"
              className={cn(
                iconButtonClassName,
                "hidden sm:inline-flex",
              )}
            >
              <Heart
                className="h-4 w-4 sm:h-5 sm:w-5"
                strokeWidth={2}
              />
            </button>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className={cn(iconButtonClassName, "md:hidden")}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  strokeWidth={2}
                />
              ) : (
                <Menu
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <nav
            id="mobile-nav"
            className="border-t border-surface-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-1 py-3 sm:px-2">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <Link
                    href={link.href}
                    className={cn(
                      navLinkClassName(activePage, link.page),
                      "block py-2",
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
