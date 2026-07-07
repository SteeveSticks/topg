import { prisma } from "@/lib/prisma";

export async function getSite() {
  return prisma.site.findFirst();
}