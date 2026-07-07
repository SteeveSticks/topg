import { z } from "zod";

export function toNextImageSrc(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
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
    val.startsWith("/uploads/") || z.string().url().safeParse(val).success,
  { message: "photoUrl must be a valid URL or /uploads/ path" },
);