# Fix the navbar responsiveness inconsistency

## Context
Currently, the navbar displays correctly on large and medium pages, but it is misaligned on small pages.
---

Once the viewport reaches about 584 × 552 px, the layout becomes inconsistent. It should scale to fit the mobile view, but the navigation bar does not shrink to match a typical phone size, for example, an iPhone 14 with a screen of 392 × 852 px. Consequently, the responsive design does not accommodate that phone size.

Try reducing the navbar size at that viewport so it fits, bringing the `Add a wishlist` button and dropdown closer to the `Birthday wish` text.

Do not touch the layout of the large screen.

## Checks when done
- Make sure the navbar fits responsive at a viewport of 393 x 852px the iphone 12 viewport
- Confirm the navbar for mobile is responsive on the live site to the size.
- Check for any lint errors.