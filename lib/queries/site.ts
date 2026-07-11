import { unstable_cache } from "next/cache";

import {
  CACHE_TAGS,
  PUBLIC_REVALIDATE_SECONDS,
} from "@/lib/cache-tags";
import { prisma } from "@/lib/prisma";

const getSiteCached = unstable_cache(
  async () => {
    return prisma.site.findFirst();
  },
  ["site"],
  {
    tags: [CACHE_TAGS.site, CACHE_TAGS.gallery],
    revalidate: PUBLIC_REVALIDATE_SECONDS,
  },
);

export async function getSite() {
  return getSiteCached();
}
