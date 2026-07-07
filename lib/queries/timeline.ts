import { prisma } from "@/lib/prisma";

export async function getTimelineEntries() {
  return prisma.timelineEntry.findMany({
    orderBy: { sortOrder: "asc" },
  });
}