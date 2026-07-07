import { z } from "zod";

export const updateSiteSchema = z.object({
  honoreeName: z
    .string({ error: "honoreeName is required" })
    .trim()
    .min(1, "honoreeName is required")
    .max(100, "honoreeName must be at most 100 characters"),
  tagline: z
    .string({ error: "tagline is required" })
    .trim()
    .min(1, "tagline is required")
    .max(200, "tagline must be at most 200 characters"),
  heroPhotoUrl: z
    .string({ error: "heroPhotoUrl is required" })
    .trim()
    .url("heroPhotoUrl must be a valid URL"),
  countdownTarget: z.coerce.date({
    error: "countdownTarget must be a valid date",
  }),
  pageCopy: z
    .string({ error: "pageCopy is required" })
    .trim()
    .min(1, "pageCopy is required")
    .max(5000, "pageCopy must be at most 5000 characters"),
});