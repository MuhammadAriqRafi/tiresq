import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const tripsRouter = createTRPCRouter({
  getTrip: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.trip.findMany({
      where: { user_id: ctx.currentUser },
      include: { rating: true, review: true },
    });
  }),
});
