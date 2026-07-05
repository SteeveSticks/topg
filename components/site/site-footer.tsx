import Link from "next/link";

const footerLinks = ["Privacy", "Help", "Terms"] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-surface-border bg-subtle">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold text-brand">
          Birthday Wishes
        </Link>

        <p className="text-sm text-copy-secondary">
          With love, for your special day.
        </p>

        <div className="flex items-center gap-6">
          {footerLinks.map((label) => (
            <span
              key={label}
              className="cursor-default text-sm text-copy-secondary"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}