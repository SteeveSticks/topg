Guestbook reuses `SiteNavbar`/`SiteFooter`. This chapter builds the guestbook hero, open-book spread, and pagination trigger only — entry data is a local mock array, no `/api` wiring yet.

### Guestbook Hero
Create `components/site/guestbook-hero.tsx`
- Heading "Guestbook" (`text-brand`)
- Subtext paragraph below
- Static content, no props required yet

### Guestbook Entry
Create `components/site/guestbook-entry.tsx`
- Message text in `font-serif italic` (Lora), `– {author}` in `text-brand` serif, date above signature in `text-faint` small-caps uppercase
- `state: "visible" | "muted"` prop — `muted` renders all text at `state-pending` color (dimmed), `visible` renders normal
- Divider line beneath each entry except the last in a column
- Props: `message`, `author`, `date`, `state`

### Guestbook Spread
Create `components/site/guestbook-spread.tsx`
- `bg-paper`, `rounded-3xl`, card shadow, subtle paper-grain texture
- Two columns split by a vertical divider line down the center
- Maps an `entries` array across left/right columns (left fills first, then right)
- Renders `GuestbookEntry` per item
- Prop: `entries: { message: string; author: string; date: string; state: "visible" | "muted" }[]`

### Load Older Messages
Create `components/site/load-older-button.tsx`
- Outline pill: `accent-primary` border + text, transparent fill
- No pagination logic yet — click handler is a no-op placeholder
- Rendered centered below the spread

### Guestbook Page
Create `app/guestbook/page.tsx`
- Compose `SiteNavbar(activePage="guestbook")` → `GuestbookHero` → `GuestbookSpread` → `LoadOlderButton` → `SiteFooter`
- Page bg: `bg-base`
- `entries` = local mock array matching the reference (Codemonk, Mom, Bella visible; one muted entry)

## Notes
- Use tokens from `globals.css` — no hardcoded hex.
- Don't build real pagination or `/api/wishes` fetching yet — mock data + no-op button only.
- Second nav item is "Memory Lane" — confirmed final, no change needed to `SiteNavbar`.
- Muted entry's real meaning (pending approval vs. scheduled vs. hidden) is still an open architecture decision — this chapter only needs the visual `state` variant, not the underlying logic.

# Check when done
- New components compile without TS errors
- No lint errors
- Entries split correctly across left/right columns
- Muted entry renders visibly dimmed vs. visible entries
- Guestbook page renders navbar, hero, spread, Load Older button, footer