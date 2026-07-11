"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type NavbarActivePage = "gallery" | "memory-lane" | "guestbook";

const navLinks: {
  label: string;
  href: string;
  page: NavbarActivePage;
}[] = [
  {
    label: "Memory Lane",
    href: "/memory-lane",
    page: "memory-lane",
  },
  { label: "Gallery", href: "/gallery", page: "gallery" },
  { label: "Guestbook", href: "/guestbook", page: "guestbook" },
];

function navLinkClassName(
  activePage: NavbarActivePage | undefined,
  page: NavbarActivePage,
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

interface SiteNavbarMobileProps {
  activePage?: NavbarActivePage;
}

export function SiteNavbarMobile({ activePage }: SiteNavbarMobileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
        className={cn(iconButtonClassName, "md:hidden")}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? (
          <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
        ) : (
          <Menu className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
        )}
      </button>

      {isMenuOpen ? (
        <nav
          id="mobile-nav"
          className="fixed inset-x-0 top-14 z-50 border-b border-surface-border bg-base px-[clamp(0.5rem,4vw,1.5rem)] sm:top-16 md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 border-x border-surface-border px-1 py-3 sm:px-2">
            {navLinks.map((link) => (
              <li key={link.page}>
                <Link
                  href={link.href}
                  className={cn(
                    navLinkClassName(activePage, link.page),
                    "block py-2",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
