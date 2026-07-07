import { jsonError } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const site = await prisma.site.findFirst();

  if (!site) {
    return jsonError("Site configuration not found", 404);
  }

  return Response.json(site);
}