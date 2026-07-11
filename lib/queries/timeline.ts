import { unstable_cache } from "next/cache";

import {
  CACHE_TAGS,
  PUBLIC_REVALIDATE_SECONDS,
} from "@/lib/cache-tags";
import { prisma } from "@/lib/prisma";

const getTimelineEntriesCached = unstable_cache(
  async () => {
    return prisma.timelineEntry.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["timeline-entries"],
  {
    tags: [CACHE_TAGS.timeline, CACHE_TAGS.gallery],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export async function getTimelineEntries() {
  return getTimelineEntriesCached();
}
