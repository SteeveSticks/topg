# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

Chapter 10 — Connect (complete)

## Current Goal

All public pages wired to real data; next work TBD

## Recently Shipped (unnumbered)

- **Memory Lane real images** — hero background uses DB photos via `getGalleryImages()` (replaces static love-video collage); timeline entries already used `photoUrl` from DB; stable `id` keys on timeline rows
- **Gallery real images** — `/gallery` renders all DB images (site hero, timeline entries, approved wish photos) via `imageUrl` on each tile; removed 20-tile placeholder padding and slide image fallbacks; `getApprovedWishesWithPhotos()` fetches every approved wish with a photo
- **next/image localhost fix** — `lib/image-url.ts` adds `toNextImageSrc()` (strips same-origin `/uploads/` absolute URLs to relative paths) and `storedImageUrlSchema`; local upload fallback now returns `/uploads/wishes/...` instead of `http://localhost:3000/...`; normalization applied in home, guestbook, memory-lane, and scroll gallery
- **Upload local fallback** — `lib/store-image-upload.ts` writes to `public/uploads/wishes/` when `BLOB_READ_WRITE_TOKEN` is unset (local dev); production still uses Vercel Blob; `/api/upload` 500 fixed; verified text-only and photo wish POSTs persist to DB
- **Home latest-wishes restore** — `LatestWishesSection` reverted to scroll-driven `ScrollWishesGallery` layout; approved wish `photoUrl` values replace slide image slots only (static slides fallback when fewer than 6); hero section still uses real `Site` data
- **10-connect** — Shared query helpers in `lib/queries/{site,wishes,timeline}.ts`; API routes refactored to import from helpers; `GET /api/wishes` paginated (`?cursor=&take=`, default 6, returns `{ items, nextCursor }`); home page (`app/page.tsx`) async with real `getSite()` + `getApprovedWishes()` → `HeroSection` (real countdown/hero/copy) + `LatestWishesSection` (WishCard grid, empty state); Memory Lane + Guestbook async with real DB data + empty states; `guestbook-load-more.tsx` client pagination via Load Older Messages; `add-wish-form.tsx` real upload + wish POST with success/error UI; `lib/wish-display.ts` mappers; external image hostnames added to `next.config.ts`
- **Guestbook card layout** — replaced two-column open-book `guestbook-spread` with `guestbook-messages` responsive card grid (1-col mobile, 2-col desktop); each `guestbook-entry` is now a self-contained `rounded-2xl bg-surface` card with Lora italic message, date, and author; muted/pending entries get a subtle border; Load Older Messages centered below grid; `guestbook-spread.tsx` deleted
- **Gallery route split** — `/` home landing unchanged (hero + latest wishes); navbar no longer highlights Gallery on `/`; new `/gallery` page lists all DB `photoUrl` records (site hero, timeline entries, approved wish photos) via `lib/gallery-images.ts` + `gallery-grid.tsx`; UI always renders 20 gallery tiles with placeholder images (slides 1–6 repeated) until real URLs are wired; navbar Gallery link + Memory Lane "View Full Gallery" CTA point to `/gallery`

## Completed

- **01-design-system** — shadcn primitives installed (Button, Card, Dialog, Input, Textarea, Badge, Avatar, Separator); `lucide-react` present; `lib/utils.ts` with `cn()`; `globals.css` updated with project cream theme tokens, shadcn variable overrides, light-only (no dark mode), and border-radius overrides via `data-slot` selectors
- **02-home** — Site chrome (`site-navbar`, `site-footer`), `countdown-block` (client, 60s refresh), `hero-section`, `wish-card` (photo/message/video variants), `latest-wishes-section` (heading + `scroll-wishes-gallery` scroll-driven Unsplash image panels with visible scrollbars), gallery page at `app/page.tsx` with mock wishes; `--accent-tertiary` token added for teal message cards
- **03-memory-lane** — `timeline-entry` (alternating two-column rows, center-line dot marker), `timeline` (vertical connector + auto-alternating `side`), `memory-lane-hero` (muted autoplay love video background overlay), `timeline-closing-cta` (cake icon, "View Full Gallery" link to `/`), Memory Lane page at `app/memory-lane/page.tsx` with mock entries (The Early Days, Finding Passions, Milestone Celebrations)
- **04-add-wish** — `relationship-toggle` (Family/Friend/Colleague pill group), `upload-dropzone` (drag-over state, file picker), `add-wish-form` (local validation, photo/video mutual dim), Add Wish page at `app/add-wish/page.tsx` with decorative confetti/cake icons; `SiteNavbar` `activePage` optional for no highlighted tab
- **05-guestbook** — `guestbook-hero`, `guestbook-entry` (visible/muted `state` variants, self-contained surface cards), `guestbook-messages` (responsive 1/2-col card grid), `load-older-button` (no-op placeholder), Guestbook page at `app/guestbook/page.tsx` with mock entries (Codemonk, Mom, Bella, Stephen)
- **06-database** — Prisma 7 + PostgreSQL configured (`prisma/schema.prisma`, `prisma.config.ts`, `.env`); `Site`, `Wish` (`Relationship`, `WishStatus` enums), `TimelineEntry` models; `lib/prisma.ts` singleton with `@prisma/adapter-pg`; init migration at `prisma/migrations/20260706140000_init/`; `prisma/seed.ts` populates one Site row (David), four Wishes (approved message/photo/video + one PENDING), three TimelineEntry rows; seed wired in `package.json` and `prisma.config.ts`
- **07-api** — Public API routes: `POST /api/upload` (PNG/JPG/GIF ≤10MB → Vercel Blob, per-IP cooldown), `GET`/`POST /api/wishes` (approved-only reads, zod-validated create always `PENDING`, photo/video mutual exclusivity, YouTube/Vimeo URL check, 1/min per-IP), `GET /api/timeline` (sortOrder asc), `GET /api/site` (404 if missing); shared helpers in `lib/rate-limit.ts`, `lib/client-ip.ts`, `lib/video-url.ts`, `lib/upload-validation.ts`, `lib/schemas/create-wish.ts`, `lib/api-response.ts`; `zod` + `@vercel/blob` added
- **08-admin** — Single-owner auth gate: `lib/admin-session.ts` (HMAC-SHA256 signed `admin_session` cookie via Node `crypto`, 7-day expiry), `lib/admin-session-edge.ts` (Web Crypto verifier for Edge middleware), `POST /api/admin/login` (plaintext `ADMIN_PASSWORD` compare, per-IP rate limit), `POST /api/admin/logout` (clears cookie), `middleware.ts` (protects `/admin` + `/admin/*` except `/admin/login`), login page at `/admin/login`, placeholder dashboard at `/admin`; requires `ADMIN_PASSWORD` + `SESSION_SECRET` in `.env`; no new npm packages
- **09-admin-ui** — Authenticated admin area: middleware extended to `/api/admin/:path*` (401 JSON for unauthenticated API calls); `lib/require-admin-session.ts` defense-in-depth in all admin mutation routes; admin APIs for wishes (`GET` all + optional `?status=`, `PATCH` approve/reject, `DELETE`), timeline (`POST`/`PATCH`/`DELETE`), site (`PATCH` upsert single row); `(dashboard)` layout with top bar (Wishes / Timeline / Settings tabs + logout); `wish-moderation-card` + dashboard with Pending/Approved/Rejected tabs; `timeline-entry-form` + timeline editor page; settings page (honoreeName, tagline, heroPhotoUrl, countdownTarget, pageCopy); shadcn `Tabs` added; refetch-after-mutation (no websockets/optimistic UI); photo fields are plain URL inputs (no upload wiring)
- **10-connect** — `lib/queries/*` shared read helpers; public pages query Prisma directly (no self-fetch); Gallery home, Memory Lane, Guestbook use real data; Add Wish form submits to `/api/upload` + `/api/wishes`; guestbook cursor pagination; empty states for zero wishes/timeline entries

## In Progress

## Open Questions

- Muted guestbook entry semantics (pending approval vs. scheduled vs. hidden) — `WishStatus.PENDING` filtered at query layer; guestbook only renders `APPROVED` wishes as `state: "visible"`; muted variant retained for future use

## Recently Completed

- **10-connect** — Build + lint clean; mock arrays removed from home, memory-lane, guestbook pages; countdown uses `Site.countdownTarget`; Load Older Messages appends real pages and hides when `nextCursor` is null; Add Wish creates `PENDING` row with inline success/error states
- **09-admin-ui** — Build + targeted lint clean; unauthenticated `/api/admin/*` → 401 JSON; dashboard tabs filter wishes by status with approve/reject/delete + confirm step; timeline CRUD reflects in `GET /api/timeline`; site `PATCH` updates existing row only; logout redirects to `/admin/login`
- **08-admin** — Build clean; middleware redirects unauthenticated `/admin` to `/admin/login`; login sets `httpOnly` signed cookie; wrong password → 401 with no cookie; logout clears cookie; future admin mutation routes must re-verify session server-side (independent of middleware)
- **07-api** — All four route handlers compile and lint clean; live checks: missing `authorName` → 400, `status: APPROVED` in body still creates `PENDING`, `GET /api/wishes` returns only `APPROVED`, timeline `sortOrder` 0→2, site returns David row, upload rejects invalid image server-side
- **06-database** — Prisma client generated to `lib/generated/prisma`; seed verified (1 Site, 4 Wishes, 3 TimelineEntry rows); `npx prisma migrate status` reports schema up to date
- **03-memory-lane** (hero video) — `memory-lane-hero` plays `/video/love-video.mp4` as a full-bleed background (autoplay, muted, loop, no controls); cream scrim keeps heading/copy readable
- **05-guestbook** (card layout) — `guestbook-spread` replaced by `guestbook-messages` card grid; each entry is a `rounded-2xl bg-surface` card; muted entries use `text-state-pending` + subtle border; Load Older Messages centered below grid
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
- Public pages import `lib/queries/*` directly in Server Components; client-side pagination (guestbook) is the only public page that fetches `/api/wishes`; `GET /api/wishes` returns `{ items, nextCursor }` not a bare array

## Session Notes

- shadcn/ui configured with `base-nova` style
- Border radii enforced globally: buttons/inputs `rounded-full`, cards `rounded-2xl`, dialogs `rounded-3xl`
- Production database is Supabase Postgres (eu-central-1); `.env` uses transaction pooler (`DATABASE_URL`, port 6543 + `pgbouncer=true`) for app queries and session pooler (`DIRECT_URL`, port 5432) for Prisma migrations via `prisma.config.ts`