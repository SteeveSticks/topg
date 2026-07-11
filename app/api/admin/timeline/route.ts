import {
  jsonError,
  zodErrorResponse,
} from "@/lib/api-response";
import { revalidatePublicTimeline } from "@/lib/cache-tags";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin-session";
import { timelineEntrySchema } from "@/lib/schemas/timeline-entry";

export async function POST(request: Request) {
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

  const parsed = timelineEntrySchema.safeParse(body);

  if (!parsed.success) {
    return zodErrorResponse(parsed.error);
  }

  const entry = await prisma.timelineEntry.create({
    data: parsed.data,
  });

  revalidatePublicTimeline();

  return Response.json(entry, { status: 201 });
}