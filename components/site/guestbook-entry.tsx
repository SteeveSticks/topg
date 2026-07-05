import { cn } from "@/lib/utils";

interface GuestbookEntryProps {
  message: string;
  author: string;
  date: string;
  state: "visible" | "muted";
  showDivider?: boolean;
}

export function GuestbookEntry({
  message,
  author,
  date,
  state,
  showDivider = true,
}: GuestbookEntryProps) {
  const isMuted = state === "muted";

  return (
    <article className={cn(showDivider ? "mb-8" : "mb-0")}>
      <p
        className={cn(
          "mb-4 font-serif text-[15px] leading-[1.7] italic md:text-base",
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
      {showDivider ? (
        <hr className="mt-8 border-surface-border" />
      ) : null}
    </article>
  );
}