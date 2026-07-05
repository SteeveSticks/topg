Memory Lane reuses `SiteNavbar`/`SiteFooter` from the home chapter. This chapter builds the timeline and closing CTA.

### Timeline Entry
Create `components/site/timeline-entry.tsx`
- Two-column row: description block + image block
- `side: "left" | "right"` prop controls which column holds the image (text/image swap sides per entry)
- Text column: title (`text-brand`, e.g. "The Early Days"), description paragraph (`text-copy-secondary`)
- Image column: photo in white `rounded-2xl` card, inset padding around image (not edge-to-edge)
- Green dot marker (`accent-primary`) rendered on the vertical connector line at this entry's vertical center
- Props: `title`, `description`, `imageUrl`, `side`

### Timeline
Create `components/site/timeline.tsx`
- Renders a vertical connector line down the center, spanning all entries
- Maps an `entries` array to `TimelineEntry`, alternating `side` automatically (index 0 = image right, index 1 = image left, etc.) — caller does not pass `side` manually
- Prop: `entries: { title: string; description: string; imageUrl: string }[]`

### Memory Lane Hero
Create `components/site/memory-lane-hero.tsx`
- Heading "A Journey of Joy" (`text-brand`)
- Subtext paragraph below
- Static content for now — no props required yet, hardcode copy directly in the component

### Closing CTA
Create `components/site/timeline-closing-cta.tsx`
- `bg-subtle` card, `rounded-2xl`, centered content
- Cake icon (lucide, `accent-primary`)
- Heading "And Many More…"
- Subtext paragraph
- "View Full Gallery" pill button (green, links to Gallery page — use `next/link`, no click handler needed)

### Memory Lane Page
Create `app/memory-lane/page.tsx`
- Compose `SiteNavbar(activePage="memory-lane")` → `MemoryLaneHero` → `Timeline` → `TimelineClosingCta` → `SiteFooter`
- Page bg: `bg-base`
- `entries` = local mock array for now (matches images: The Early Days, Finding Passions, Milestone Celebrations)

## Notes
- Use tokens from `globals.css` — no hardcoded hex.
- Timeline entry data is owner-authored only per architecture — no public submission form in this chapter.
- Don't wire "View Full Gallery" to real routing logic beyond a static link to `/`.

# Check when done
- New components compile without TS errors
- No lint errors
- Timeline entries alternate sides automatically from the `entries` array, not manually per-entry
- Connector line + dots align with each entry's vertical center
- Memory Lane page renders navbar, hero, timeline, closing CTA, footer