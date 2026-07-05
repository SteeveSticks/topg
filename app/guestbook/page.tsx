import { GuestbookHero } from "@/components/site/guestbook-hero";
import { GuestbookSpread } from "@/components/site/guestbook-spread";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";

const entries = [
  {
    message:
      "Dearest David, Wishing you the happiest of birthdays! It feels like just yesterday we were celebrating your 20th. May this year bring you as much joy and laughter as you bring to everyone around you. Can't wait to see what adventures this next chapter holds for you.",
    author: "Codemonk",
    date: "JULY 6, 2026",
    state: "visible" as const,
  },
  {
    message:
      "Happy Birthday! I am so incredibly proud of everything you've accomplished this year. You inspire me every day with your dedication and kind heart.",
    author: "Mom",
    date: "JULY 7, 2026",
    state: "visible" as const,
  },
  {
    message:
      "To many more years of questionable decisions and unforgettable memories! Have a blast today! 🎉",
    author: "Bella",
    date: "JULY 8, 2026",
    state: "visible" as const,
  },
  {
    message:
      "Looking forward to the party tonight! Save a slice of cake for me!",
    author: "Stephen",
    date: "JULY 8, 2026",
    state: "visible" as const,
  },
];

export default function GuestbookPage() {
  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar activePage="guestbook" />
      <main className="mx-auto max-w-6xl pt-16">
        <GuestbookHero />
        <GuestbookSpread entries={entries} />
      </main>
      <SiteFooter />
    </div>
  );
}