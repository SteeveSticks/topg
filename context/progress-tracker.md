# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

Chapter 09 — Admin UI (complete)

## Current Goal

Chapter 10 — next feature chapter (TBD)

## Completed

- **01-design-system** — shadcn primitives installed (Button, Card, Dialog, Input, Textarea, Badge, Avatar, Separator); `lucide-react` present; `lib/utils.ts` with `cn()`; `globals.css` updated with project cream theme tokens, shadcn variable overrides, light-only (no dark mode), and border-radius overrides via `data-slot` selectors
- **02-home** — Site chrome (`site-navbar`, `site-footer`), `countdown-block` (client, 60s refresh), `hero-section`, `wish-card` (photo/message/video variants), `latest-wishes-section` (heading + `scroll-wishes-gallery` scroll-driven Unsplash image panels with visible scrollbars), gallery page at `app/page.tsx` with mock wishes; `--accent-tertiary` token added for teal message cards
- **03-memory-lane** — `timeline-entry` (alternating two-column rows, center-line dot marker), `timeline` (vertical connector + auto-alternating `side`), `memory-lane-hero` (muted autoplay love video background overlay), `timeline-closing-cta` (cake icon, "View Full Gallery" link to `/`), Memory Lane page at `app/memory-lane/page.tsx` with mock entries (The Early Days, Finding Passions, Milestone Celebrations)
- **04-add-wish** — `relationship-toggle` (Family/Friend/Colleague pill group), `upload-dropzone` (drag-over state, file picker), `add-wish-form` (local validation, photo/video mutual dim), Add Wish page at `app/add-wish/page.tsx` with decorative confetti/cake icons; `SiteNavbar` `activePage` optional for no highlighted tab
- **05-guestbook** — `guestbook-hero`, `guestbook-entry` (visible/muted `state` variants), `guestbook-spread` (two-column open-book layout with paper grain), `load-older-button` (no-op placeholder), Guestbook page at `app/guestbook/page.tsx` with mock entries (Codemonk, Mom, Bella visible; one muted)
- **06-database** — Prisma 7 + PostgreSQL configured (`prisma/schema.prisma`, `prisma.config.ts`, `.env`); `Site`, `Wish` (`Relationship`, `WishStatus` enums), `TimelineEntry` models; `lib/prisma.ts` singleton with `@prisma/adapter-pg`; init migration at `prisma/migrations/20260706140000_init/`; `prisma/seed.ts` populates one Site row (David), four Wishes (approved message/photo/video + one PENDING), three TimelineEntry rows; seed wired in `package.json` and `prisma.config.ts`
- **07-api** — Public API routes: `POST /api/upload` (PNG/JPG/GIF ≤10MB → Vercel Blob, per-IP cooldown), `GET`/`POST /api/wishes` (approved-only reads, zod-validated create always `PENDING`, photo/video mutual exclusivity, YouTube/Vimeo URL check, 1/min per-IP), `GET /api/timeline` (sortOrder asc), `GET /api/site` (404 if missing); shared helpers in `lib/rate-limit.ts`, `lib/client-ip.ts`, `lib/video-url.ts`, `lib/upload-validation.ts`, `lib/schemas/create-wish.ts`, `lib/api-response.ts`; `zod` + `@vercel/blob` added
- **08-admin** — Single-owner auth gate: `lib/admin-session.ts` (HMAC-SHA256 signed `admin_session` cookie via Node `crypto`, 7-day expiry), `lib/admin-session-edge.ts` (Web Crypto verifier for Edge middleware), `POST /api/admin/login` (plaintext `ADMIN_PASSWORD` compare, per-IP rate limit), `POST /api/admin/logout` (clears cookie), `middleware.ts` (protects `/admin` + `/admin/*` except `/admin/login`), login page at `/admin/login`, placeholder dashboard at `/admin`; requires `ADMIN_PASSWORD` + `SESSION_SECRET` in `.env`; no new npm packages
- **09-admin-ui** — Authenticated admin area: middleware extended to `/api/admin/:path*` (401 JSON for unauthenticated API calls); `lib/require-admin-session.ts` defense-in-depth in all admin mutation routes; admin APIs for wishes (`GET` all + optional `?status=`, `PATCH` approve/reject, `DELETE`), timeline (`POST`/`PATCH`/`DELETE`), site (`PATCH` upsert single row); `(dashboard)` layout with top bar (Wishes / Timeline / Settings tabs + logout); `wish-moderation-card` + dashboard with Pending/Approved/Rejected tabs; `timeline-entry-form` + timeline editor page; settings page (honoreeName, tagline, heroPhotoUrl, countdownTarget, pageCopy); shadcn `Tabs` added; refetch-after-mutation (no websockets/optimistic UI); photo fields are plain URL inputs (no upload wiring)

## In Progress

## Open Questions

- Muted guestbook entry semantics (pending approval vs. scheduled vs. hidden) — `WishStatus.PENDING` is now the data-layer source of truth; UI wiring happens in a later chapter

## Recently Completed

- **09-admin-ui** — Build + targeted lint clean; unauthenticated `/api/admin/*` → 401 JSON; dashboard tabs filter wishes by status with approve/reject/delete + confirm step; timeline CRUD reflects in `GET /api/timeline`; site `PATCH` updates existing row only; logout redirects to `/admin/login`
- **08-admin** — Build clean; middleware redirects unauthenticated `/admin` to `/admin/login`; login sets `httpOnly` signed cookie; wrong password → 401 with no cookie; logout clears cookie; future admin mutation routes must re-verify session server-side (independent of middleware)
- **07-api** — All four route handlers compile and lint clean; live checks: missing `authorName` → 400, `status: APPROVED` in body still creates `PENDING`, `GET /api/wishes` returns only `APPROVED`, timeline `sortOrder` 0→2, site returns David row, upload rejects invalid image server-side
- **06-database** — Prisma client generated to `lib/generated/prisma`; seed verified (1 Site, 4 Wishes, 3 TimelineEntry rows); `npx prisma migrate status` reports schema up to date
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
- Prisma 7 client generated to `lib/generated/prisma` with `@prisma/adapter-pg` driver adapter; `lib/prisma.ts` exports a hot-reload-safe singleton
- Admin auth uses HMAC-signed `admin_session` cookie (`SESSION_SECRET`); middleware runs on Edge so token verification in `middleware.ts` uses `lib/admin-session-edge.ts` (Web Crypto), while API routes use Node `crypto` in `lib/admin-session.ts`; Next.js 16 deprecates `middleware.ts` in favour of `proxy.ts` — kept `middleware.ts` per chapter spec
- Admin UI lives under `app/admin/(dashboard)/` route group (layout excludes login); all admin API handlers call `requireAdminSession()` independently of middleware; admin forms use plain URL text inputs for photos (upload wiring deferred)

## Session Notes

- shadcn/ui configured with `base-nova` style
- Border radii enforced globally: buttons/inputs `rounded-full`, cards `rounded-2xl`, dialogs `rounded-3xl`
- Production database is Supabase Postgres (eu-central-1); `.env` uses transaction pooler (`DATABASE_URL`, port 6543 + `pgbouncer=true`) for app queries and session pooler (`DIRECT_URL`, port 5432) for Prisma migrations via `prisma.config.ts`