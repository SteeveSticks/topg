import { MemoryLaneHero } from "@/components/site/memory-lane-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";
import { Timeline } from "@/components/site/timeline";
import { TimelineClosingCta } from "@/components/site/timeline-closing-cta";

const entries = [
  {
    title: "The Early Days",
    description:
      "Before the big dreams and bold adventures, there were quiet mornings, curious eyes, and the kind of wonder that turns an ordinary afternoon into something magical.",
    imageUrl:
      "https://images.unsplash.com/photo-1503454537845-cef9b9b1c6a?w=800&h=600&fit=crop",
  },
  {
    title: "Finding Passions",
    description:
      "Somewhere between school days and late-night projects, hobbies became callings — music, sports, art, or whatever lit that unmistakable spark of joy.",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
  },
  {
    title: "Milestone Celebrations",
    description:
      "Graduations, reunions, and birthdays that brought everyone together — each one a reminder of how far the journey has come and how many people are cheering along the way.",
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
  },
];

export default function MemoryLanePage() {
  return (
    <div className="min-h-screen bg-base">
      <SiteNavbar activePage="memory-lane" />
      <main className="mx-auto max-w-6xl pt-16">
        <MemoryLaneHero />
        <Timeline entries={entries} />
        <TimelineClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}