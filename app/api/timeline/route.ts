import { prisma } from "@/lib/prisma";

export async function GET() {
  const entries = await prisma.timelineEntry.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return Response.json(entries);
}