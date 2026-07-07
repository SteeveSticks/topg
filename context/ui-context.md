# UI Context

Light theme only. Warm "invitation card" look: cream surfaces, rounded cards, green brand accent, peach/pink secondary accent used sparingly.

## Colors (`globals.css` vars → Tailwind tokens)
| Token | Var | Hex |
|---|---|---|
| bg-base | `--bg-base` | `#F7F4EF` |
| bg-surface | `--bg-surface` | `#FFFFFF` |
| bg-subtle | `--bg-subtle` | `#F1EDE5` |
| bg-paper (guestbook) | `--bg-paper` | `#F4F0E8` |
| border-default | `--border-default` | `#E7E2D8` |
| border-subtle | `--border-subtle` | `#D9D3C6` |
| text-primary | `--text-primary` | `#22201C` |
| text-secondary | `--text-secondary` | `#5B564C` |
| text-muted | `--text-muted` | `#8C8778` |
| text-faint | `--text-faint` | `#A9A392` |
| accent-primary (brand green) | `--accent-primary` | `#1FA36B` |
| accent-primary-dark (gradient end) | `--accent-primary-dark` | `#0E5C3D` |
| accent-primary-dim | `--accent-primary-dim` | `rgba(31,163,107,.12)` |
| accent-secondary (peach) | `--accent-secondary` | `#F2A98C` |
| accent-decorative (pink circle) | `--accent-decorative` | `#F6C9D6` |
| state-error | `--state-error` | `#E5484D` |
| state-success | `--state-success` | `#1FA36B` |
| state-warning | `--state-warning` | `#E9A23B` |
| state-pending | `--state-pending` | `#B9B4A6` |

No hardcoded hex or raw Tailwind colors (`emerald-*`, `stone-*`) — tokens only.

## Typography
Confirmed via Figma Inspect. Wired in `app/layout.tsx` as `--font-sans` (Quicksand) / `--font-serif` (Lora).
| Role | Font |
|---|---|
| Body / headings / meta | Quicksand |
| Guestbook message copy | Lora, italic |

Guestbook serif/italic is a deliberate one-off (keepsake-book feel) — don't extend to other pages.

## Radius
- `rounded-full`: buttons, inputs, chips, nav pills
- `rounded-2xl`: cards/panels
- `rounded-3xl`: modals

## Components
**Navbar** — sticky, cream bg, bottom border. Left: logo. Center: nav links. Right: Add Wish pill (green gradient), confetti icon btn, heart icon btn.

**Countdown** — pill container, two stat groups (days/hours) + dot divider, green numerals, muted uppercase labels.

**Wish card** (3 variants, `rounded-2xl`, shadow):
- photo: image + caption + `– author`
- message: solid peach/teal bg, folded top-right corner, message + author
- video: thumbnail, centered play button, duration badge, caption + author

**Decorative circle** — soft pink circle behind section headings (e.g. "Latest Wishes"), purely decorative.

**Timeline (Memory Lane)** — alternating left-text/right-image rows, vertical connector line + dots, green heading, muted description, white `rounded-2xl` image card.

**Add Wish form**:
- text input, leading icon, `rounded-full`
- relationship: pill toggle chips (Family/Friend/Colleague), selected = green fill+border
- textarea, `rounded-2xl`
- upload dropzone: dashed `rounded-2xl`, icon + "Upload a file or drag and drop" + file-type/size helper
- divider "OR LINK A VIDEO"
- URL input, leading link icon
- submit: full-width pill, green gradient, chevron icon, helper text below

**Guestbook message card** — `rounded-2xl` white surface card with shadow, Lora italic message, green signature line, faint small-caps date. Pending/scheduled entries render fully muted (`state-pending`) with a subtle border — real status, not just opacity. Cards arranged in a responsive grid (1-col mobile, 2-col desktop). "Load Older Messages": outline pill centered below the grid.

**Footer** — muted bg, logo left, tagline center, Privacy/Help/Terms right.

## Layout
- Shared navbar+footer shell across Gallery / Memory Lane / Guestbook / Add Wish
- Centered max-width column, generous whitespace
- Add Wish = focused centered single-card page, not inline
- Guestbook = responsive card grid of individual message cards

## Icons
Lucide, stroke-only. Sizes: `h-4 w-4` inline, `h-5 w-5` buttons/inputs, `h-8 w-8` feature/empty-state.

## Open items
- Second nav label: "Memory Lane" (Gallery/Memory Lane screens) vs "Our Story" (Guestbook screen) — pick one.
- Confirm dimmed guestbook entry = pending / scheduled / hidden status.