"use client";

interface LoadOlderButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function LoadOlderButton({
  onClick,
  disabled = false,
  loading = false,
}: LoadOlderButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="rounded-full border border-brand bg-transparent px-8 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Loading..." : "Load Older Messages"}
    </button>
  );
}