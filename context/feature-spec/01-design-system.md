Read `AGENTS.md` before starting.

We're adding the design system and UI primitive components that every later chapter (Gallery, Memory Lane, Guestbook, Add Wish, Admin) builds on top of.
`shadcn/ui` has been install and configured.

Add these shadcn components:
- Button
- Card
- Dialog
- Input
- Textarea
- Badge
- Avatar
- Separator

Do not modify the generated `components/ui/*` files

Also install `lucide-react`.

Create `lib/utils.ts` with a reusable `cn()` helper for merging Tailwind classes.

Ensure all installed components match the existing light/cream theme defined in `globals.css` — this project is light-only, no dark mode. Confirm shadcn's default dark/zinc theme values are fully overridden by the project's tokens (`bg-base`, `bg-surface`, `text-brand`, etc. per the UI context doc).

Confirm border radius follows the project's scale, not shadcn defaults:
- Buttons and inputs: `rounded-full`
- Cards: `rounded-2xl`
- Dialog: `rounded-3xl`

## Check when done
- All components import without errors
- `cn()` works properly
- No shadcn default dark/zinc styling appears anywhere
- Button, Input, and Card render with the project's rounded-full / rounded-2xl radii, not shadcn defaults