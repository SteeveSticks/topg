"use client";

import { useEffect, useState } from "react";

interface CountdownBlockProps {
  targetDate: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeRemaining(targetDate: string): TimeRemaining {
  const now = Date.now();
  const target = targetDate ? new Date(targetDate).getTime() : Number.NaN;
  const diff = Number.isFinite(target) ? Math.max(0, target - now) : 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function formatUnit(value?: number | null): string {
  const safeValue = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return safeValue.toString().padStart(2, "0");
}

export function CountdownBlock({ targetDate }: CountdownBlockProps) {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    computeTimeRemaining(targetDate)
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining(computeTimeRemaining(targetDate));
    }, 1_000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-4 rounded-sm border border-surface-border bg-base px-2 py-2 shadow-sm sm:gap-6 sm:px-8">
      <div className="flex min-w-20 flex-col items-center gap-1">
        <span className="text-3xl font-bold tabular-nums text-brand">
          {formatUnit(remaining.days)}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-copy-muted sm:text-xs">
          Days
        </span>
      </div>

      <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />

      <div className="flex min-w-20 flex-col items-center gap-1">
        <span className="text-3xl font-bold tabular-nums text-brand">
          {formatUnit(remaining.hours)}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-copy-muted sm:text-xs">
          Hours
        </span>
      </div>

      <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />

      <div className="flex min-w-20 flex-col items-center gap-1">
        <span className="text-3xl font-bold tabular-nums text-brand">
          {formatUnit(remaining.minutes)}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-copy-muted sm:text-xs">
          Minutes
        </span>
      </div>

      <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />

      <div className="flex min-w-20 flex-col items-center gap-1">
        <span className="text-3xl font-bold tabular-nums text-brand">
          {formatUnit(remaining.seconds)}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-copy-muted sm:text-xs">
          Seconds
        </span>
      </div>
    </div>
  );
}