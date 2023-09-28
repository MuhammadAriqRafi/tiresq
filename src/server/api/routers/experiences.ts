import { z } from "zod";
import { prisma } from "@/server/db";
import { privateProcedure, router } from "../trpc";

const createInputSchema = z.object({
  historyId: z.number(),
  review: z.string().trim().optional(),
  rating: z.number().min(1).max(5),
});
const create = privateProcedure
  .input(createInputSchema)
  .mutation(async ({ input: { historyId, rating, review } }) => {
    const trip = await prisma.trip.findFirst({
      where: { id: historyId },
      select: { rating_id: true, review_id: true },
    });

    if (trip !== null) {
      const { rating_id, review_id } = trip;

      if (rating_id !== null)
        await prisma.rating.update({
          where: { id: rating_id },
          data: { star: rating },
        });

      if (review && review_id !== null)
        await prisma.review.update({
          where: { id: review_id },
          data: { review },
        });
    }
  });

export const experiencesRouter = router({ create });
