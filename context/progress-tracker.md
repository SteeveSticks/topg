# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

Chapter 02 — Home / Gallery shell (complete)

## Current Goal

Chapter 03 — next feature chapter (TBD)

## Completed

- **01-design-system** — shadcn primitives installed (Button, Card, Dialog, Input, Textarea, Badge, Avatar, Separator); `lucide-react` present; `lib/utils.ts` with `cn()`; `globals.css` updated with project cream theme tokens, shadcn variable overrides, light-only (no dark mode), and border-radius overrides via `data-slot` selectors
- **02-home** — Site chrome (`site-navbar`, `site-footer`), `countdown-block` (client, 60s refresh), `hero-section`, `wish-card` (photo/message/video variants), `latest-wishes-section` (heading + `scroll-wishes-gallery` scroll-driven Unsplash image panels with visible scrollbars), gallery page at `app/page.tsx` with mock wishes; `--accent-tertiary` token added for teal message cards

## In Progress



## Open Questions



## Architecture Decisions

- shadcn `components/ui/*` files are generated-only — theme and radius customisation lives in `globals.css`, not hand-edits to component files
- Project tokens (`bg-base`, `text-brand`, `text-copy-primary`, etc.) defined in `:root` and mapped through `@theme inline`

## Session Notes

- shadcn/ui configured with `base-nova` style
- Border radii enforced globally: buttons/inputs `rounded-full`, cards `rounded-2xl`, dialogs `rounded-3xl`