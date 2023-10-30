import { z } from "zod";

export const getExperienceInputSchema = z.object({ historyId: z.number() });

export const createExperienceInputSchema = z.object({
  historyId: z.number(),
  userRating: z.number().min(1).max(5),
  userReview: z
    .string()
    .optional()
    .transform((value) => (value !== "" ? value : undefined)),
});

export type CreateExperienceInputSchemaType = z.infer<
  typeof createExperienceInputSchema
>;
