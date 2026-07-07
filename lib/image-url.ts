import { z } from "zod";

const VERCEL_BLOB_HOST_PATTERN = /\.public\.blob\.vercel-storage\.com$/i;

export function isVercelBlobUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return VERCEL_BLOB_HOST_PATTERN.test(hostname);
  } catch {
    return false;
  }
}

export function toNextImageSrc(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return url;
  }

  if (isVercelBlobUrl(url)) {
    return url;
  }

  try {
    const { pathname } = new URL(url);

    if (pathname.startsWith("/uploads/")) {
      return pathname;
    }

    return url;
  } catch {
    return url;
  }
}

export const storedImageUrlSchema = z.string().refine(
  (val) =>
    val.startsWith("/uploads/") ||
    isVercelBlobUrl(val) ||
    z.string().url().safeParse(val).success,
  { message: "photoUrl must be a valid URL or /uploads/ path" },
);