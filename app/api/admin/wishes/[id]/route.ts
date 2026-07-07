import {
  jsonError,
  zodErrorResponse,
} from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin-session";
import { updateWishStatusSchema } from "@/lib/schemas/update-wish-status";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdminSession();
  if (authError) {
    return authError;
  }

  const { id } = await context.params;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = updateWishStatusSchema.safeParse(body);

  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const existing = await prisma.wish.findUnique({ where: { id } });

  if (!existing) {
    return jsonError("Wish not found", 404);
  }

  const wish = await prisma.wish.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  return Response.json(wish);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdminSession();
  if (authError) {
    return authError;
  }

  const { id } = await context.params;

  const existing = await prisma.wish.findUnique({ where: { id } });

  if (!existing) {
    return jsonError("Wish not found", 404);
  }

  await prisma.wish.delete({ where: { id } });

  return Response.json({ success: true });
}