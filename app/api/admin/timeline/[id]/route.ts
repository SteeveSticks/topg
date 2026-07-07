import {
  jsonError,
  zodErrorResponse,
} from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin-session";
import { updateTimelineEntrySchema } from "@/lib/schemas/timeline-entry";

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

  const parsed = updateTimelineEntrySchema.safeParse(body);

  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  if (Object.keys(parsed.data).length === 0) {
    return jsonError("At least one field is required", 400);
  }

  const existing = await prisma.timelineEntry.findUnique({ where: { id } });

  if (!existing) {
    return jsonError("Timeline entry not found", 404);
  }

  const entry = await prisma.timelineEntry.update({
    where: { id },
    data: parsed.data,
  });

  return Response.json(entry);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdminSession();
  if (authError) {
    return authError;
  }

  const { id } = await context.params;

  const existing = await prisma.timelineEntry.findUnique({ where: { id } });

  if (!existing) {
    return jsonError("Timeline entry not found", 404);
  }

  await prisma.timelineEntry.delete({ where: { id } });

  return Response.json({ success: true });
}