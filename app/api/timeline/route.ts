import { getTimelineEntries } from "@/lib/queries/timeline";

export async function GET() {
  const entries = await getTimelineEntries();

  return Response.json(entries);
}