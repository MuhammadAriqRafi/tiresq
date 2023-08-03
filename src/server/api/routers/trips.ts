import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const tripsRouter = createTRPCRouter({
  getTrip: privateProcedure
    .input(
      z
        .object({
          historyId: z.number().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      if (input) {
        return await ctx.prisma.trip.findMany({
          where: { id: input.historyId },
          include: { rating: true, review: true, tambal_ban: true },
        });
      }

      return await ctx.prisma.trip.findMany({
        where: { user_id: ctx.currentUser },
        orderBy: { created_at: "desc" },
        include: { rating: true, review: true, tambal_ban: true },
      });
    }),
});
