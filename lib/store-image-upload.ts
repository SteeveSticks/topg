import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

export async function storeImageUpload(
  file: File,
  objectKey: string,
): Promise<string> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(objectKey, file, {
      access: "public",
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return blob.url;
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", "wishes");
  await mkdir(uploadsDir, { recursive: true });

  const filename = path.basename(objectKey);
  const filePath = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return `/uploads/wishes/${filename}`;
}