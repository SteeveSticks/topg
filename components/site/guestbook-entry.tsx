import { cn } from "@/lib/utils";

interface GuestbookEntryProps {
  message: string;
  author: string;
  date: string;
  state: "visible" | "muted";
}

export function GuestbookEntry({
  message,
  author,
  date,
  state,
}: GuestbookEntryProps) {
  const isMuted = state === "visible";

  return (
    <article
      className={cn(
        "rounded-md bg-surface p-4 shadow-md",
        isMuted && "border border-surface-border-subtle",
      )}
    >
      <p
        className={cn(
          "mb-4 font-serif text-[15px] leading-[1.7] italic text-black md:text-base",
          isMuted ? "text-state-pending" : "text-copy-primary",
        )}
      >
        {message}
      </p>
      <p
        className={cn(
          "mb-1 text-[11px] font-medium tracking-[0.12em] uppercase",
          isMuted ? "text-state-pending" : "text-copy-faint",
        )}
      >
        {date}
      </p>
      <p
        className={cn(
          "font-serif text-sm font-medium",
          isMuted ? "text-state-pending" : "text-brand",
        )}
      >
        — {author}
      </p>
    </article>
  );
}
