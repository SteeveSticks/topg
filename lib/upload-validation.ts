const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/gif",
]);

const ALLOWED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif"]);

export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;

export function validateImageUpload(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return "File must be PNG, JPG, or GIF";
  }

  const extension = file.name
    .slice(file.name.lastIndexOf("."))
    .toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return "File must be PNG, JPG, or GIF";
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return "File must be 10MB or smaller";
  }

  return null;
}