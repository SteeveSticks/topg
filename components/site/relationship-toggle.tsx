"use client";

import { cn } from "@/lib/utils";

export type Relationship = "family" | "friend" | "colleague";

const options: { value: Relationship; label: string }[] = [
  { value: "family", label: "Family" },
  { value: "friend", label: "Friend" },
  { value: "colleague", label: "Colleague" },
];

interface RelationshipToggleProps {
  value: Relationship;
  onChange: (value: Relationship) => void;
}

export function RelationshipToggle({
  value,
  onChange,
}: RelationshipToggleProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isSelected
                ? "border-brand bg-accent-dim text-brand"
                : "border-surface-border bg-transparent text-copy-secondary hover:border-brand/40 hover:text-copy-primary",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}