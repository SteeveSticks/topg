import { getClientIp } from "@/lib/client-ip";
import {
  jsonError,
  rateLimitResponse,
} from "@/lib/api-response";
import { checkRateLimit } from "@/lib/rate-limit";
import { storeImageUpload } from "@/lib/store-image-upload";
import { validateImageUpload } from "@/lib/upload-validation";

const UPLOAD_COOLDOWN_MS = 10_000;

export async function POST(request: Request) {
  const ip = await getClientIp();
  const rateLimit = checkRateLimit(`upload:${ip}`, UPLOAD_COOLDOWN_MS);

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.retryAfterMs ?? UPLOAD_COOLDOWN_MS);
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError("Invalid form data", 400);
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return jsonError("A single image file is required", 400);
  }

  const validationError = validateImageUpload(file);

  if (validationError) {
    return jsonError(validationError, 400);
  }

  try {
    const objectKey = `wishes/${crypto.randomUUID()}-${file.name}`;
    const url = await storeImageUpload(file, objectKey);

    return Response.json({ url });
  } catch (error) {
    console.error("Upload failed:", error);
    return jsonError("Failed to upload file", 500);
  }
}