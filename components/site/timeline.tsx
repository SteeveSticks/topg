import { TimelineEntry } from "@/components/site/timeline-entry";

export interface TimelineEntryData {
  title: string;
  description: string;
  imageUrl: string;
}

interface TimelineProps {
  entries: TimelineEntryData[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <section className="relative px-6 py-8">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-surface-border md:block"
      />

      <div className="relative mx-auto max-w-6xl">
        {entries.map((entry, index) => (
          <TimelineEntry
            key={entry.title}
            title={entry.title}
            description={entry.description}
            imageUrl={entry.imageUrl}
            side={index % 2 === 0 ? "right" : "left"}
          />
        ))}
      </div>
    </section>
  );
}