import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { findClosestDestination } from "../services/trip-service";

const indexInputSchema = z.object({ historyId: z.number() }).nullable();
const index = privateProcedure
  .input(indexInputSchema)
  .query(({ ctx, input }) => {
    if (input) {
      return ctx.prisma.trip.findMany({
        where: { id: input.historyId },
        include: { rating: true, review: true, destination: true },
      });
    }
    return ctx.prisma.trip.findMany({
      where: { user_id: ctx.currentUserId },
      orderBy: { created_at: "desc" },
      include: { rating: true, review: true, destination: true },
    });
  });

const findNearestTambalBanInputSchema = z.object({
  userCurrentCoordinate: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});
const findNearestTambalBan = publicProcedure
  .input(findNearestTambalBanInputSchema)
  .query(
    async ({
      ctx: { prisma, currentUserId },
      input: { userCurrentCoordinate },
    }) => {
      if (currentUserId !== null) {
        const onprogressTrip = await prisma.trip.findFirst({
          where: { user_id: currentUserId, status: "onprogress" },
          select: { destination: true },
        });

        if (onprogressTrip !== null) {
          const { destination } = onprogressTrip;
          const { id, name, longitude, latitude } = destination;
          const onprogressTripDestination = { id, name, longitude, latitude };

          const { choosenDestination } = await findClosestDestination(
            [onprogressTripDestination],
            userCurrentCoordinate
          );

          return choosenDestination;
        }
      }

      const allTambalBan = await prisma.tambalBan.findMany({
        select: {
          id: true,
          name: true,
          longitude: true,
          latitude: true,
        },
      });

      // find user region first
      // add region attribute to tambal ban
      // get only tambal ban that has the same region as the user
      // start filtering the nearest tambal ban based on user region

      const { choosenDestination, choosenDestinationId } =
        await findClosestDestination(allTambalBan, userCurrentCoordinate);

      if (currentUserId !== null)
        await prisma.trip.create({
          data: {
            user_id: currentUserId,
            tambal_ban_id: choosenDestinationId,
          },
        });

      return choosenDestination;
    }
  );

const cancelTrip = publicProcedure.mutation(
  async ({ ctx: { prisma, currentUserId } }) => {
    if (currentUserId === null) return;

    return prisma.trip.updateMany({
      where: { user_id: currentUserId, status: "onprogress" },
      data: { status: "cancelled" },
    });
  }
);

const completeTrip = publicProcedure.mutation(
  async ({ ctx: { prisma, currentUserId } }) => {
    if (currentUserId === null) return;

    const { id: newRatingId } = await prisma.rating.create({
      select: { id: true },
    });
    const { id: newReviewId } = await prisma.review.create({
      select: { id: true },
    });

    await prisma.trip.updateMany({
      where: { user_id: currentUserId, status: "onprogress" },
      data: {
        status: "completed",
        rating_id: newRatingId,
        review_id: newReviewId,
      },
    });
  }
);

export const tripsRouter = createTRPCRouter({
  index,
  findNearestTambalBan,
  completeTrip,
  cancelTrip,
});
