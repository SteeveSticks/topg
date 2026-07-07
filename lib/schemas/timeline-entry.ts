import { z } from "zod";

export const timelineEntrySchema = z.object({
  title: z
    .string({ error: "title is required" })
    .trim()
    .min(1, "title is required")
    .max(200, "title must be at most 200 characters"),
  description: z
    .string({ error: "description is required" })
    .trim()
    .min(1, "description is required")
    .max(2000, "description must be at most 2000 characters"),
  photoUrl: z
    .string({ error: "photoUrl is required" })
    .trim()
    .url("photoUrl must be a valid URL"),
  sortOrder: z.coerce
    .number({ error: "sortOrder is required" })
    .int("sortOrder must be an integer")
    .min(0, "sortOrder must be at least 0"),
});

export const updateTimelineEntrySchema = timelineEntrySchema.partial();