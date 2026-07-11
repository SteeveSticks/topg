import {
  jsonError,
  zodErrorResponse,
} from "@/lib/api-response";
import { revalidatePublicSite } from "@/lib/cache-tags";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin-session";
import { updateSiteSchema } from "@/lib/schemas/update-site";

export async function PATCH(request: Request) {
  const authError = await requireAdminSession();
  if (authError) {
    return authError;
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = updateSiteSchema.safeParse(body);

  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const existing = await prisma.site.findFirst();

  if (!existing) {
    return jsonError("Site configuration not found", 404);
  }

  const site = await prisma.site.update({
    where: { id: existing.id },
    data: parsed.data,
  });

  revalidatePublicSite();

  return Response.json(site);
}