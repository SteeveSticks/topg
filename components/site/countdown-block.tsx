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
    <div className="grid w-full max-w-sm grid-cols-4 items-center gap-1 rounded-sm border border-surface-border bg-base px-3 py-2 shadow-sm sm:inline-flex sm:w-auto sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-6 sm:px-8">
      <div className="flex min-w-0 flex-col items-center gap-0.5 sm:min-w-20 sm:gap-1">
        <span className="text-2xl font-bold tabular-nums text-brand sm:text-3xl">
          {formatUnit(remaining.days)}
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-copy-muted sm:text-xs sm:tracking-[0.2em]">
          Days
        </span>
      </div>

      <span
        className="hidden size-1.5 shrink-0 rounded-full bg-brand sm:block"
        aria-hidden="true"
      />

      <div className="flex min-w-0 flex-col items-center gap-0.5 sm:min-w-20 sm:gap-1">
        <span className="text-2xl font-bold tabular-nums text-brand sm:text-3xl">
          {formatUnit(remaining.hours)}
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-copy-muted sm:text-xs sm:tracking-[0.2em]">
          Hours
        </span>
      </div>

      <span
        className="hidden size-1.5 shrink-0 rounded-full bg-brand sm:block"
        aria-hidden="true"
      />

      <div className="flex min-w-0 flex-col items-center gap-0.5 sm:min-w-20 sm:gap-1">
        <span className="text-2xl font-bold tabular-nums text-brand sm:text-3xl">
          {formatUnit(remaining.minutes)}
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-copy-muted sm:text-xs sm:tracking-[0.2em]">
          Minutes
        </span>
      </div>

      <span
        className="hidden size-1.5 shrink-0 rounded-full bg-brand sm:block"
        aria-hidden="true"
      />

      <div className="flex min-w-0 flex-col items-center gap-0.5 sm:min-w-20 sm:gap-1">
        <span className="text-2xl font-bold tabular-nums text-brand sm:text-3xl">
          {formatUnit(remaining.seconds)}
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-copy-muted sm:text-xs sm:tracking-[0.2em]">
          Seconds
        </span>
      </div>
    </div>
  );
}