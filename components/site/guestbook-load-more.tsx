"use client";

import { useState } from "react";

import {
  GuestbookMessages,
  type GuestbookMessage,
} from "@/components/site/guestbook-messages";
import { LoadOlderButton } from "@/components/site/load-older-button";
import { wishToGuestbookMessage } from "@/lib/wish-display";
import type { WishModel } from "@/lib/generated/prisma/models/Wish";

interface WishesPageResponse {
  items: WishModel[];
  nextCursor: string | null;
}

interface GuestbookLoadMoreProps {
  initialEntries: GuestbookMessage[];
  initialNextCursor: string | null;
}

export function GuestbookLoadMore({
  initialEntries,
  initialNextCursor,
}: GuestbookLoadMoreProps) {
  const [entries, setEntries] = useState(initialEntries);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    if (!nextCursor || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/wishes?cursor=${encodeURIComponent(nextCursor)}&take=6`,
      );

      if (!response.ok) {
        throw new Error("Failed to load older messages");
      }

      const data = (await response.json()) as WishesPageResponse;
      const newEntries = data.items.map(wishToGuestbookMessage);

      setEntries((current) => [...current, ...newEntries]);
      setNextCursor(data.nextCursor);
    } catch {
      setError("Could not load older messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16">
      <GuestbookMessages entries={entries} />
      {error ? (
        <p className="mt-6 text-center text-sm text-state-error">{error}</p>
      ) : null}
      {nextCursor ? (
        <div className="mt-8 flex justify-center">
          <LoadOlderButton
            onClick={loadMore}
            loading={loading}
            disabled={loading}
          />
        </div>
      ) : null}
    </div>
  );
}