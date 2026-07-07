# Birthday Wishes
## Overview
Birthday Wishes is a single-event public celebration site. A site owner sets up a personalized page for someone's birthday, guests browse photos and memories and leave wishes without needing an account, and the owner moderates submissions before they appear publicly.
## Goals
1. Let the site owner set up and configure a single personalized birthday page.
2. Let anyone view a public gallery of photos, messages, and video wishes.
3. Let anyone browse a chronological "memory lane" timeline of the honoree's life.
4. Let visitors submit their own wish — a message, optional photo, or optional video link — without signing in.
5. Let the site owner moderate submitted wishes before they go public.
6. Show a live countdown to the birthday date.
## Core User Flow
1. Visitor opens the site link.
2. Visitor lands on the Gallery: hero photo, countdown, and latest approved wishes.
3. Visitor browses Memory Lane for the timeline of highlights.
4. Visitor browses the Guestbook to read approved messages.
5. Visitor opens "Add Wish" and submits a name, relationship, message, and optional photo or video link.
6. Submission is stored as pending and is not yet publicly visible.
7. Site owner reviews pending wishes in an admin view.
8. Owner approves or rejects each submission.
9. Approved wishes appear in the Gallery and Guestbook.
10. Owner can add or edit Memory Lane timeline entries at any time.
## Features
### Public Gallery
- Hero section with honoree photo, name, and greeting message.
- Live countdown to the birthday date.
- "Latest Wishes" feed showing approved photo, message, and video cards.
### Memory Lane
- Chronological, alternating timeline of titled entries with photo and description.
- Owner-authored only — not a destination for public submissions.
### Guestbook
- Responsive card grid of approved written wishes with author and date.
- Pagination via "Load Older Messages."
- Pending/scheduled entries render in a distinct muted state and are not shown to the public.
### Add Wish
- Public submission form: name, relationship (family/friend/colleague), message.
- Optional photo upload (PNG/JPG/GIF, size-limited) or a pasted YouTube/Vimeo link — not both required.
- Submission enters a pending queue rather than publishing immediately.
### Moderation (Admin)
- Owner-only authenticated view listing pending wishes.
- Approve, reject, or remove any wish.
- Manage Memory Lane entries and core site settings (honoree name, countdown date, hero photo, tagline).
## Scope
### In Scope
- Public, no-account browsing of Gallery, Memory Lane, and Guestbook
- Anonymous public wish submission with photo upload or video link
- Pending/approved/rejected moderation workflow
- Single owner-authenticated admin area
- Countdown to a configurable target date
- Owner-managed Memory Lane timeline entries
- Persistent storage for wishes, timeline entries, and site config
### Out Of Scope
- Visitor accounts or sign-in
- Multi-owner or collaborator permission tiers
- Video upload/transcoding (video is embed-only via external link)
- Billing or subscription systems
- Real-time collaborative editing
- Native mobile applications
## Success Criteria
1. A visitor can view the Gallery, Memory Lane, and Guestbook without signing in.
2. A visitor can submit a wish with a photo or video link and it does not appear publicly until approved.
3. The site owner can sign in, review pending wishes, and approve or reject them.
4. Approved wishes appear correctly in both the Gallery feed and the Guestbook.
5. The countdown accurately reflects time remaining to the configured birthday date.
6. The owner can add and edit Memory Lane entries independent of visitor submissions.