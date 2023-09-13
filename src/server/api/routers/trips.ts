import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { searchDirections } from "../services/trip-service";
import { TRPCError } from "@trpc/server";

type ClosestTambalBan = {
  name: string;
  latitude: string;
  longitude: string;
  distance: number;
  duration: number;
  coords: number[][];
};

const MAX_DISTANCE = 5;

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
      where: { user_id: ctx.currentUser },
      orderBy: { created_at: "desc" },
      include: { rating: true, review: true, destination: true },
    });
  });

const findNearestTambalBanInputSchema = z.object({
  currentLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});
const findNearestTambalBan = privateProcedure
  .input(findNearestTambalBanInputSchema)
  .query(async ({ ctx: { prisma, currentUser }, input }) => {
    const userLatitude = input.currentLocation.latitude;
    const userLongitude = input.currentLocation.longitude;

    if (userLatitude === null || userLongitude === null)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Lokasi user tidak boleh kosong",
      });

    let closest: ClosestTambalBan = {
      name: "",
      latitude: "",
      longitude: "",
      distance: Infinity,
      duration: Infinity,
      coords: [],
    };

    const onprogressTripDestination = await prisma.trip.findFirst({
      where: { user_id: currentUser, status: "onprogress" },
      select: { destination: true },
    });

    if (onprogressTripDestination !== null) {
      const { destination } = onprogressTripDestination;
      const { name, longitude, latitude } = destination;

      const data = await searchDirections({
        startLatitude: userLatitude,
        startLongitude: userLongitude,
        goalLatitude: latitude,
        goalLongitude: longitude,
      });

      closest = {
        name,
        latitude,
        longitude,
        coords: data.routes[0].geometry.coordinates,
        duration: Math.floor(data.routes[0].duration / 60),
        distance: parseFloat((data.routes[0].distance / 1000).toFixed(2)),
      };

      return closest;
    }

    let choosenTambalBanId: number | undefined = undefined;
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

    for (const destination of allTambalBan) {
      try {
        const { id, name, longitude, latitude } = destination;
        const data = await searchDirections({
          startLongitude: userLongitude,
          startLatitude: userLatitude,
          goalLongitude: longitude,
          goalLatitude: latitude,
        });
        const distance = parseFloat(
          (data?.routes[0]?.distance / 1000).toFixed(2)
        );

        if (distance >= MAX_DISTANCE) continue;
        if (distance < closest.distance) {
          choosenTambalBanId = id;
          closest = {
            name,
            latitude,
            longitude,
            distance,
            duration: data.routes[0].duration,
            coords: data.routes[0].geometry.coordinates,
          };
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Yah, lagi ada gangguan :(, coba lagi nanti yaa",
        });
      }
    }

    if (choosenTambalBanId) {
      await prisma.trip.create({
        data: {
          user_id: currentUser,
          tambal_ban_id: choosenTambalBanId,
        },
      });

      return {
        ...closest,
        duration: Math.floor(closest.duration / 60),
      };
    }

    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message:
        "Maaf, kita belum bisa nemuin tambal ban dalam radius 5 kilometer dari lokasi kamu",
    });
  });

const cancelTrip = privateProcedure.mutation(async ({ ctx }) => {
  return ctx.prisma.trip.updateMany({
    where: { user_id: ctx.currentUser, status: "onprogress" },
    data: { status: "cancelled" },
  });
});

const completeTrip = privateProcedure.mutation(async ({ ctx }) => {
  const { id: newRatingId } = await ctx.prisma.rating.create({
    select: { id: true },
  });
  const { id: newReviewId } = await ctx.prisma.review.create({
    select: { id: true },
  });

  await ctx.prisma.trip.updateMany({
    where: { user_id: ctx.currentUser, status: "onprogress" },
    data: {
      status: "completed",
      rating_id: newRatingId,
      review_id: newReviewId,
    },
  });
});

export const tripsRouter = createTRPCRouter({
  index,
  findNearestTambalBan,
  completeTrip,
  cancelTrip,
});
