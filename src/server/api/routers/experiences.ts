import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";

const createInputSchema = z.object({
  tripId: z.number(),
  review: z.string().trim(),
  rating: z.number().min(1).max(5).nullable(),
});
const create = privateProcedure
  .input(createInputSchema)
  .mutation(async ({ ctx, input: { tripId, rating, review } }) => {
    const { rating_id, review_id } = await ctx.prisma.trip.findFirstOrThrow({
      where: { id: tripId },
      select: { rating_id: true, review_id: true },
    });

    await ctx.prisma.rating.update({
      where: { id: rating_id! },
      data: { star: rating },
    });

    if (review.length > 0)
      await ctx.prisma.review.update({
        where: { id: review_id! },
        data: { review },
      });
  });

export const experienceRouter = createTRPCRouter({ create });
