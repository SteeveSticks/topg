Base chrome (navbar + footer) is shared/reused by every later chapter (Memory Lane, Guestbook, Add Wish). This chapter also builds the Gallery (home) page content.

### Site Navbar
Create `components/site/site-navbar.tsx`
- Fixed top navbar, `bg-base`, subtle bottom border
- Left/center/right sections
- Left: "Birthday Wishes" wordmark (`text-brand`), links `/`
- Center: nav links — Gallery, Memory Lane, Guestbook
- `activePage: "gallery" | "memory-lane" | "guestbook"` prop; active = `text-brand` + underline, inactive = `text-copy-secondary`
- Right: "Add Wish" pill button (green gradient), confetti icon btn, heart icon btn — lucide-react, stroke only
- No mobile collapse yet

### Site Footer
Create `components/site/site-footer.tsx`
- `bg-subtle`
- Left: wordmark (`text-brand`). Center: "With love, for your special day." Right: Privacy/Help/Terms (static, no routes yet)
- No props, static only

### Countdown Block
Create `components/site/countdown-block.tsx`
- Client component
- `rounded-full` oval, `bg-base`, subtle border
- Two stat groups (days/hours) + vertical dot divider
- `text-brand` numerals, uppercase `text-copy-muted` labels
- `targetDate: string` prop; compute on mount, refresh every 60s
- No seconds, no expired-state handling yet

### Hero Section
Create `components/site/hero-section.tsx`
- Circular avatar, `accent-primary` ring
- Cake icon badge (bottom-left overlap), confetti icon badge (top-right overlap)
- Heading "Happy Birthday, {honoreeName}!" — name in `text-brand`
- Subtext paragraph, then `CountdownBlock`
- Props: `honoreeName`, `photoUrl`, `subtitle`, `countdownTarget`

### Wish Card
Create `components/site/wish-card.tsx`
- Single component, `variant: "photo" | "message" | "video"` drives layout
- photo: image + `"caption"` + `– author`, white surface
- message: solid bg via `colorTheme` prop (peach/teal), folded top-right corner, message + author
- video: thumbnail + centered play button overlay + duration badge + caption/author (static overlay, no playback wiring yet)
- All: `rounded-2xl`, shadow
- Props: `variant`, `author`, `caption`/`message`, `imageUrl?`, `colorTheme?`, `duration?`

### Latest Wishes Section
Create `components/site/latest-wishes-section.tsx`
- Heading "Latest Wishes" w/ decorative `accent-decorative` circle behind text
- Staggered grid of `WishCard` from `wishes` prop (don't force equal heights)
- Floating "Add Your Wish" pill button (`Plus` icon, green gradient), anchored bottom-right, no click behavior yet

### Gallery Page
Create `app/page.tsx`
- Compose `SiteNavbar(activePage="gallery")` → `HeroSection` → `LatestWishesSection` → `SiteFooter`
- Page bg: `bg-base`
- `wishes` = local mock array for now

## Notes
- Use tokens from `globals.css` per UI context — no hardcoded hex.
- Don't build Add Wish form/dialog yet — trigger buttons only.
- Countdown `targetDate` is a static prop for now, not wired to site config.

# Check when done
- New components compile without TS errors
- No lint errors
- Gallery page renders navbar, hero, countdown, staggered wishes grid, footer
- "Add Wish" (navbar) and "Add Your Wish" (section) buttons present but non-functional