Add Wish reuses `SiteNavbar`/`SiteFooter`. This chapter builds the submission form UI and local validation only — actual persistence (`POST /api/wishes`) is a later chapter per architecture context.

### Relationship Toggle
Create `components/site/relationship-toggle.tsx`
- Pill toggle group: Family / Friend / Colleague
- Controlled: `value` + `onChange` props
- Selected = `accent-primary` fill + border + `text-brand`; unselected = outline, `text-copy-secondary`

### Upload Dropzone
Create `components/site/upload-dropzone.tsx`
- Dashed border, `rounded-2xl`
- Icon + "Upload a file" (`text-brand`, acts as file-picker trigger) + " or drag and drop" (`text-copy-secondary`)
- Helper text: "PNG, JPG, GIF up to 10MB"
- Basic drag-over visual state + hidden `<input type="file">`; no actual upload call yet
- Props: `onFileSelect(file: File)`, `accept`, `maxSizeMb`

### Add Wish Form
Create `components/site/add-wish-form.tsx`
- White `rounded-2xl` card
- Heading "Share Your Wish" (`text-brand`), subtext below
- Fields: Name input (leading `User` icon), `RelationshipToggle`, Message textarea, `UploadDropzone`, divider "OR LINK A VIDEO", video URL input (leading `Link` icon)
- Submit: full-width pill, green gradient, `ChevronRight` icon, label "Post Wish"
- Helper text under button: "Your wish will be added to the public gallery."
- Local form state only (`useState` or `react-hook-form`); required: name + message
- Photo upload and video link are mutually exclusive — filling one visually disables/dims the other, not a hard block
- `onSubmit` prop called with form values — no network call inside this component; page/caller decides what happens with it

### Add Wish Page
Create `app/add-wish/page.tsx`
- Compose `SiteNavbar` → `AddWishForm` → `SiteFooter`
- Decorative confetti icon, faint, top-left of content area
- Decorative cake icon, faint, bottom-right of content area
- Page bg: `bg-base`
- `onSubmit` handler is a no-op/console-log placeholder for now

## Notes
- Extend `SiteNavbar`'s `activePage` prop type to allow no tab highlighted (Add Wish isn't one of the three nav-listed pages).
- Don't build `/api/wishes` or persistence in this chapter — form submits locally only, no backend call.
- Don't build success/confirmation state yet.

# Check when done
- New components compile without TS errors
- No lint errors
- Relationship toggle switches selected state on click
- Submit is blocked when name or message is empty
- Filling photo upload visually dims the video link field and vice versa
- Add Wish page renders navbar (no tab active), form, decorative icons, footer