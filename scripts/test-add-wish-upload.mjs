import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const testImagePath = join(process.cwd(), "scripts", "test-upload.png");
writeFileSync(testImagePath, Buffer.from(PNG_BASE64, "base64"));

try {
  const formData = new FormData();
  formData.append(
    "file",
    new File([readFileSync(testImagePath)], "test-upload.png", {
      type: "image/png",
    }),
  );

  const uploadResponse = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });
  const uploadBody = await uploadResponse.json();

  console.log("API upload status:", uploadResponse.status);
  console.log("API upload response:", uploadBody);

  if (!uploadResponse.ok) {
    process.exit(1);
  }

  const photoUrl = uploadBody.url;
  const imageResponse = await fetch(photoUrl);
  console.log("Image fetch status:", imageResponse.status);

  const wishResponse = await fetch(`${BASE_URL}/api/wishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      authorName: "Blob Test",
      relationship: "FRIEND",
      message: "Confirming Add Wish upload works with public Vercel Blob.",
      photoUrl,
    }),
  });
  const wishBody = await wishResponse.json();

  console.log("Wish submit status:", wishResponse.status);
  console.log("Wish submit response:", wishBody);

  process.exit(wishResponse.ok && imageResponse.ok ? 0 : 1);
} finally {
  unlinkSync(testImagePath);
}