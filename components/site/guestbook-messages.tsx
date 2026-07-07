import { GuestbookEntry } from "@/components/site/guestbook-entry";

export interface GuestbookMessage {
  id: string;
  message: string;
  author: string;
  date: string;
  state: "visible" | "muted";
}

interface GuestbookMessagesProps {
  entries: GuestbookMessage[];
}

export function GuestbookMessages({ entries }: GuestbookMessagesProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {entries.map((entry) => (
        <li key={entry.id}>
          <GuestbookEntry
            message={entry.message}
            author={entry.author}
            date={entry.date}
            state={entry.state}
          />
        </li>
      ))}
    </ul>
  );
}