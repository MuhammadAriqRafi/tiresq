import { z } from "zod";
import { prisma } from "@/server/db";
import { router, publicProcedure } from "@/server/api/trpc";
import {
  getOnProgressTrip,
  findClosestDestination,
  findRoute,
} from "../services/trip-service";
import { TRPCError } from "@trpc/server";

const currentUserId = "user_2TEYMQ96bJgvNNki3rQPQQzKV9t";

const isOnTrip = publicProcedure.query(async () => {
  const onprogressTrip = await getOnProgressTrip({
    prisma,
    currentUserId,
  });

  return onprogressTrip !== null;
});

const getOnProgressTripRouteInputSchema = z.object({
  userCurrentCoordinate: z.object({
    longitude: z.number(),
    latitude: z.number(),
  }),
});
const getOnProgressTripRoute = publicProcedure
  .input(getOnProgressTripRouteInputSchema)
  .query(async ({ input: { userCurrentCoordinate } }) => {
    const onprogressTrip = await getOnProgressTrip({
      currentUserId,
      prisma,
    });

    if (onprogressTrip !== null) {
      const route = await findRoute({
        destinationName: onprogressTrip?.destination.name,
        destinationLongitude: Number(onprogressTrip?.destination.longitude),
        destinationLatitude: Number(onprogressTrip?.destination.latitude),
        startLongitude: userCurrentCoordinate.longitude,
        startLatitude: userCurrentCoordinate.latitude,
      });

      return route;
    }

    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "Kamu sedang tidak mencari tambal ban",
    });
  });

const findNearestTambalBanRouteInputSchema = z.object({
  userCurrentCoordinate: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});
const findNearestTambalBanRoute = publicProcedure
  .input(findNearestTambalBanRouteInputSchema)
  .query(async ({ input: { userCurrentCoordinate } }) => {
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
  });

const cancelTrip = publicProcedure.mutation(async () => {
  if (currentUserId === null) return;

  return prisma.trip.updateMany({
    where: { user_id: currentUserId, status: "onprogress" },
    data: { status: "cancelled" },
  });
});

const completeTrip = publicProcedure.mutation(async () => {
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
});

export const tripsRouter = router({
  isOnTrip,
  cancelTrip,
  completeTrip,
  getOnProgressTripRoute,
  findNearestTambalBanRoute,
});
