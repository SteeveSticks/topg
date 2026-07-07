import { z } from "zod";

export const updateWishStatusSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"], {
    message: 'status must be "APPROVED" or "REJECTED"',
  }),
});