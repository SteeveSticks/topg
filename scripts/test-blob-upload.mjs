import { list, put } from "@vercel/blob";

const token = process.env.BLOB_READ_WRITE_TOKEN;
const storeId = process.env.BLOB_STORE_ID;
const access = process.env.BLOB_ACCESS === "private" ? "private" : "public";

if (!token) {
  console.error("BLOB_READ_WRITE_TOKEN is missing");
  process.exit(1);
}

const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const objectKey = `wishes/test-${Date.now()}.png`;
const file = new File([Buffer.from(PNG_BASE64, "base64")], "test-upload.png", {
  type: "image/png",
});

console.log("Store ID:", storeId ?? "(from token)");
console.log("Access:", access);

const blob = await put(objectKey, file, {
  access,
  contentType: "image/png",
  token,
  ...(storeId ? { storeId } : {}),
});

console.log("Upload URL:", blob.url);

if (!blob.url.includes("blob.vercel-storage.com")) {
  console.error("Unexpected blob URL");
  process.exit(1);
}

const imageResponse = await fetch(blob.url);
console.log("Public fetch status:", imageResponse.status);

if (!imageResponse.ok) {
  console.error("Uploaded image is not publicly accessible");
  process.exit(1);
}

const blobs = await list({ prefix: "wishes/", token });
const found = blobs.blobs.some((item) => item.url === blob.url);

console.log("Files in wishes/:", blobs.blobs.length);
console.log(found ? "SUCCESS: file confirmed in Vercel Blob" : "ERROR: file missing from list");

process.exit(found ? 0 : 1);