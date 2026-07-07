# Architecture Context

## Stack

| Layer             | Technology                | Role                                                                 |
| ------------------ | ------------------------- | --------------------------------------------------------------------- |
| Framework           | Next.js + TypeScript      | Server-rendered public pages + form/API routes                        |
| UI                  | Tailwind + shadcn/ui       | Component composition and styling                                     |
| Database            | Prisma + PostgreSQL       | Wish submissions, timeline entries, project/site config                |
| Media storage       | Vercel Blob (or S3-compatible) | Uploaded wish photos                                              |
| Video handling      | Embed only (YouTube/Vimeo) | No upload/transcoding — stored as an external URL, rendered via embed |
| Admin auth          | Lightweight single-owner auth (e.g. Clerk or a passcode-gated admin route) | Moderation and content management only — public visitors never authenticate |
| Email (optional)    | Resend or similar          | Notify site owner when a new wish is submitted                        |

## System Boundaries

- `app/(public)` — Unauthenticated public routes: Gallery, Memory Lane, Guestbook, Add Wish form. No user accounts required.
- `app/admin` — Authenticated owner-only routes: moderation queue, timeline (Memory Lane) editor, site settings (name, countdown target date, hero photo).
- `app/api/wishes` — Public `POST` for wish submission (validation, spam/rate-limiting, file handling); admin-only `PATCH`/`DELETE` for approve/reject/remove.
- `app/api/timeline` — Admin-only CRUD for Memory Lane entries.
- `lib` — Shared infrastructure: Prisma client, upload validation helpers, rate limiting, media URL parsing (YouTube/Vimeo ID extraction).
- `components` — UI composition: navbar, wish cards, timeline rows, guestbook messages grid, upload dropzone, countdown block.
- `prisma` — Database schema and generated client output.

## Data Model (conceptual)

- **Site** — single-row config: honoree name, tagline, hero photo, countdown target date, page copy.
- **Wish** — id, author name, relationship (`family` | `friend` | `colleague`), message, optional photo URL, optional video URL (external link), status (`pending` | `approved` | `rejected`), createdAt.
- **TimelineEntry** — id, title, description, photo URL, sortOrder. Authored by the site owner, not public submitters.

## Storage Model

- **Database**: all structured metadata — wish text/status/relationship, timeline entries, site config.
- **Blob storage**: uploaded wish photos only, referenced by URL in the `Wish` record (`photoUrl`).
- **External links**: submitted videos are never uploaded or transcoded — only a validated YouTube/Vimeo URL is stored and rendered via embed.

## Moderation Model

- Every publicly submitted wish enters with `status = pending` and is **not** shown on the Gallery or Guestbook until approved.
- Only the site owner (admin route) can transition a wish to `approved` or `rejected`.
- The Guestbook's dimmed/muted entry treatment corresponds to a `pending` (or future-dated/scheduled) wish that is visible to the owner in preview but suppressed from general public view — this should be made a single explicit status, not a purely visual/opacity hack.
- No visitor-level accounts exist; submission is anonymous aside from the free-text "Your Name" field, so basic rate-limiting and spam checks (e.g. honeypot field, submission cooldown per IP) are the primary abuse guard.

## Auth Model

- Public pages require no authentication.
- A single admin identity (the site owner) is the only authenticated role — no collaborator/multi-user permission model is needed for a single-event site.
- Admin routes are protected at the middleware/layout level; all mutation endpoints re-check admin identity server-side regardless of client-side gating.

## Countdown & Scheduling

- The countdown block reads `Site.countdownTarget` and computes days/hours client-side (or via a lightweight server computation) — no background job required since it's a pure date diff.
- If wishes can be scheduled for future visibility (e.g. "reveal on the day"), that's modeled as a `visibleAt` timestamp on `Wish` checked at query time, not a separate background job.

## Invariants

1. Public routes never expose `pending`/`rejected` wishes — filtering happens at the query layer, not the client.
2. Media uploads are validated for file type and size (per the UI's stated PNG/JPG/GIF, up to 10MB) before a Blob URL is persisted.
3. Video is always an external embed link — the system never accepts or stores raw video file uploads.
4. All mutation endpoints (`approve`, `reject`, timeline edits, site settings) enforce owner-only auth server-side, independent of any UI-level hiding of admin controls.
5. Timeline entries are owner-authored only; there is no public submission path into `TimelineEntry`.