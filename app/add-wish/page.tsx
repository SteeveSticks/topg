"use client";

import { Cake, Sparkles } from "lucide-react";
import { AddWishForm } from "@/components/site/add-wish-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";

export default function AddWishPage() {
  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar />
      <main className="relative mx-auto max-w-xl px-6 pt-24 pb-16">
        <Sparkles
          className="pointer-events-none absolute top-20 left-2 h-16 w-16 text-accent-decorative opacity-40 sm:left-4 sm:h-20 sm:w-20"
          strokeWidth={1.5}
          aria-hidden
        />
        <Cake
          className="pointer-events-none absolute right-2 bottom-4 h-16 w-16 text-accent-secondary opacity-40 sm:right-4 sm:h-20 sm:w-20"
          strokeWidth={1.5}
          aria-hidden
        />

        <AddWishForm
          onSubmit={(values) => {
            console.log("Wish submitted:", values);
          }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}