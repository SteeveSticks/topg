import { jsonError } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin-session";
import { WishStatus } from "@/lib/generated/prisma/enums";

const VALID_STATUSES = new Set<string>([
  WishStatus.PENDING,
  WishStatus.APPROVED,
  WishStatus.REJECTED,
]);

export async function GET(request: Request) {
  const authError = await requireAdminSession();
  if (authError) {
    return authError;
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");

  if (statusParam && !VALID_STATUSES.has(statusParam)) {
    return jsonError("status must be PENDING, APPROVED, or REJECTED", 400);
  }

  const wishes = await prisma.wish.findMany({
    where: statusParam ? { status: statusParam as WishStatus } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return Response.json(wishes);
}