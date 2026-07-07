import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { getBlobStorageConfig } from "@/lib/blob-storage";

export async function storeImageUpload(
  file: File,
  objectKey: string,
): Promise<string> {
  const blobConfig = getBlobStorageConfig();

  if (blobConfig.enabled) {
    // Let the SDK resolve credentials: OIDC + BLOB_STORE_ID on Vercel,
    // or BLOB_READ_WRITE_TOKEN locally / off-platform. Passing an explicit
    // token overrides OIDC and can point at a stale or missing store.
    const blob = await put(objectKey, file, {
      access: blobConfig.access,
      contentType: file.type,
    });

    return blob.url;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Image uploads require BLOB_READ_WRITE_TOKEN in production.",
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", "wishes");
  await mkdir(uploadsDir, { recursive: true });

  const filename = path.basename(objectKey);
  const filePath = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return `/uploads/wishes/${filename}`;
}