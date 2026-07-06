# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

Chapter 05 — Guestbook (complete)

## Current Goal

Chapter 06 — next feature chapter (TBD)

## Completed

- **01-design-system** — shadcn primitives installed (Button, Card, Dialog, Input, Textarea, Badge, Avatar, Separator); `lucide-react` present; `lib/utils.ts` with `cn()`; `globals.css` updated with project cream theme tokens, shadcn variable overrides, light-only (no dark mode), and border-radius overrides via `data-slot` selectors
- **02-home** — Site chrome (`site-navbar`, `site-footer`), `countdown-block` (client, 60s refresh), `hero-section`, `wish-card` (photo/message/video variants), `latest-wishes-section` (heading + `scroll-wishes-gallery` scroll-driven Unsplash image panels with visible scrollbars), gallery page at `app/page.tsx` with mock wishes; `--accent-tertiary` token added for teal message cards
- **03-memory-lane** — `timeline-entry` (alternating two-column rows, center-line dot marker), `timeline` (vertical connector + auto-alternating `side`), `memory-lane-hero` (muted autoplay love video background overlay), `timeline-closing-cta` (cake icon, "View Full Gallery" link to `/`), Memory Lane page at `app/memory-lane/page.tsx` with mock entries (The Early Days, Finding Passions, Milestone Celebrations)
- **04-add-wish** — `relationship-toggle` (Family/Friend/Colleague pill group), `upload-dropzone` (drag-over state, file picker), `add-wish-form` (local validation, photo/video mutual dim), Add Wish page at `app/add-wish/page.tsx` with decorative confetti/cake icons; `SiteNavbar` `activePage` optional for no highlighted tab
- **05-guestbook** — `guestbook-hero`, `guestbook-entry` (visible/muted `state` variants), `guestbook-spread` (two-column open-book layout with paper grain), `load-older-button` (no-op placeholder), Guestbook page at `app/guestbook/page.tsx` with mock entries (Codemonk, Mom, Bella visible; one muted)

## In Progress

## Open Questions

- Muted guestbook entry semantics (pending approval vs. scheduled vs. hidden) — visual `state` variant only for now

## Recently Completed

- **03-memory-lane** (hero video) — `memory-lane-hero` plays `/video/love-video.mp4` as a full-bleed background (autoplay, muted, loop, no controls); cream scrim keeps heading/copy readable
- **05-guestbook** — Guestbook page composed with shared navbar/footer; entries split left-then-right across spread columns; muted entry uses `text-state-pending` throughout; Load Older Messages button sits inside right page of spread (outline pill, no-op handler); mock copy matches reference (Codemonk, Mom, Bella, Stephen)
- **04-add-wish** — Add Wish form UI with local-only submit (console-log placeholder); name + message required; photo upload and video URL visually dim each other when filled; navbar renders with no active tab on `/add-wish`
- **03-memory-lane** — Memory Lane page composed with shared navbar/footer; timeline entries alternate image side from array index; connector line + green dots align at entry vertical center on `md+`

- **02-home** (navbar mobile fix) — `site-navbar` grouped logo + Add Wish + menu with tight `gap-1.5` below `md`; compact `h-12` / `text-sm` / `px-3` sizing for phone viewports (393×852); desktop action buttons deferred to `md+` only (fixes 584–768px crowding); `md+` layout unchanged (`h-16`, center nav, full Add Wish pill, confetti/heart icons)
- **02-home** (mobile scroll-wishes-gallery) — mobile image stacks centered via `getCenteredMobilePosition` + `max-w-[360px] mx-auto` wrapper; `md+` sticky overlap layout unchanged
- **02-home** (mobile scroll-wishes-gallery text) — `SlideText` responsive below `md`: removed `min-h-[70vh]`, tighter type/spacing/padding, full-width copy; `md+` layout unchanged
- **02-home** (mobile countdown) — `countdown-block` responsive below `sm`: 4-column grid, tighter type/spacing, dot separators hidden; `sm+` layout unchanged (inline-flex, dividers, original sizing)



## Architecture Decisions

- shadcn `components/ui/*` files are generated-only — theme and radius customisation lives in `globals.css`, not hand-edits to component files
- Project tokens (`bg-base`, `text-brand`, `text-copy-primary`, etc.) defined in `:root` and mapped through `@theme inline`

## Session Notes

- shadcn/ui configured with `base-nova` style
- Border radii enforced globally: buttons/inputs `rounded-full`, cards `rounded-2xl`, dialogs `rounded-3xl`