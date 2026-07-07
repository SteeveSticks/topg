import { jsonError } from "@/lib/api-response";
import { getSite } from "@/lib/queries/site";

export async function GET() {
  const site = await getSite();

  if (!site) {
    return jsonError("Site configuration not found", 404);
  }

  return Response.json(site);
}