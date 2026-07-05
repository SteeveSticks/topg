import { GuestbookEntry } from "@/components/site/guestbook-entry";
import { LoadOlderButton } from "@/components/site/load-older-button";

export interface GuestbookSpreadEntry {
  message: string;
  author: string;
  date: string;
  state: "visible" | "muted";
}

interface GuestbookSpreadProps {
  entries: GuestbookSpreadEntry[];
}

const paperGrainStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
};

function EntryColumn({
  entries,
  showLoadButton = false,
}: {
  entries: GuestbookSpreadEntry[];
  showLoadButton?: boolean;
}) {
  return (
    <div className="flex flex-col px-8 py-10 md:px-12 md:py-12">
      {entries.map((entry, index) => (
        <GuestbookEntry
          key={`${entry.author}-${entry.date}-${index}`}
          message={entry.message}
          author={entry.author}
          date={entry.date}
          state={entry.state}
          showDivider={index < entries.length - 1}
        />
      ))}
      {showLoadButton ? (
        <div className="mt-2 flex justify-center">
          <LoadOlderButton />
        </div>
      ) : null}
    </div>
  );
}

export function GuestbookSpread({ entries }: GuestbookSpreadProps) {
  const midpoint = Math.ceil(entries.length / 2);
  const leftEntries = entries.slice(0, midpoint);
  const rightEntries = entries.slice(midpoint);

  return (
    <div className="relative mx-auto max-w-5xl px-6 pb-16">
      <div className="relative overflow-hidden rounded-3xl bg-paper shadow-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-multiply"
          style={paperGrainStyle}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-surface-border-subtle md:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-4 left-1/2 hidden w-px -translate-x-1/2 bg-surface-border/40 md:block"
        />
        <div className="relative grid md:grid-cols-2">
          <EntryColumn entries={leftEntries} />
          <EntryColumn entries={rightEntries} showLoadButton />
        </div>
      </div>
    </div>
  );
}