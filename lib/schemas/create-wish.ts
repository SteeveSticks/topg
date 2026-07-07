import { z } from "zod";
import { Relationship } from "@/lib/generated/prisma/enums";
import { isValidVideoEmbedUrl } from "@/lib/video-url";

export const createWishSchema = z
  .object({
    authorName: z
      .string({ error: "authorName is required" })
      .trim()
      .min(1, "authorName is required")
      .max(100, "authorName must be at most 100 characters"),
    relationship: z.nativeEnum(Relationship, {
      message: "relationship must be FAMILY, FRIEND, or COLLEAGUE",
    }),
    message: z
      .string({ error: "message is required" })
      .trim()
      .min(1, "message is required")
      .max(1000, "message must be at most 1000 characters"),
    photoUrl: z.string().url("photoUrl must be a valid URL").optional(),
    videoUrl: z.string().trim().optional(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.videoUrl && !isValidVideoEmbedUrl(data.videoUrl)) {
      ctx.addIssue({
        code: "custom",
        message: "videoUrl must be a valid YouTube or Vimeo URL",
        path: ["videoUrl"],
      });
    }
  })
  .transform((data) => {
    const photoUrl = data.photoUrl;
    const videoUrl =
      photoUrl && data.videoUrl ? undefined : data.videoUrl || undefined;

    return {
      authorName: data.authorName,
      relationship: data.relationship,
      message: data.message,
      photoUrl,
      videoUrl,
    };
  });

export type CreateWishInput = z.infer<typeof createWishSchema>;