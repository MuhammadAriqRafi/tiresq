import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

type Coords = {
  routes: [
    {
      distance: number;
      duration: number;
      geometry: {
        coordinates: number[][];
      };
    }
  ];
};

type ClosestTambalBan = {
  name: string;
  latitude: string;
  longitude: string;
  distance: number;
  duration: number;
  coords: number[][];
};

const searchDirections = async ({
  startLongitude,
  startLatitude,
  goalLongitude,
  goalLatitude,
}: {
  startLongitude: number;
  startLatitude: number;
  goalLongitude: string;
  goalLatitude: string;
}): Promise<Coords> => {
  const mapboxDirectionsAPI = `https://api.mapbox.com/directions/v5/mapbox/walking/${startLongitude},${startLatitude};${goalLongitude},${goalLatitude}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

  const response = await fetch(mapboxDirectionsAPI);
  const data = (await response.json()) as Coords;

  return data;
};

export const tripsRouter = createTRPCRouter({
  getTrip: privateProcedure
    .input(
      z
        .object({
          historyId: z.number(),
        })
        .nullable()
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
  findNearestTambalBan: privateProcedure
    .input(
      z.object({
        currentLocation: z.object({
          latitude: z.number().nullable(),
          longitude: z.number().nullable(),
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      let closest: ClosestTambalBan = {
        name: "",
        latitude: "",
        longitude: "",
        distance: Infinity,
        duration: Infinity,
        coords: [],
      };
      const userLatitude = input.currentLocation.latitude;
      const userLongitude = input.currentLocation.longitude;

      if (userLatitude === null || userLongitude === null) return closest;

      // Check if user has any onprogress trip
      const onprogressTripDestination = await ctx.prisma.trip.findFirst({
        where: { user_id: ctx.currentUser, status: "onprogress" },
        select: { tambal_ban: true },
      });

      // If exist, get the direaction and return it
      if (onprogressTripDestination) {
        const {
          tambal_ban: { name, longitude, latitude },
        } = onprogressTripDestination;

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

      // If not exist, do the nearest tambal ban search
      let choosenTambalBanId: number | undefined = undefined;
      const allTambalBan = await ctx.prisma.tambalBan.findMany({
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

      for (const tambalBan of allTambalBan) {
        try {
          const { id, longitude, latitude, name } = tambalBan;
          const data = await searchDirections({
            startLongitude: userLongitude,
            startLatitude: userLatitude,
            goalLongitude: longitude,
            goalLatitude: latitude,
          });
          const distance = data?.routes[0]?.distance;

          if (distance < closest.distance) {
            choosenTambalBanId = id;
            closest = {
              name,
              latitude,
              longitude,
              distance: data.routes[0].distance,
              duration: data.routes[0].duration,
              coords: data.routes[0].geometry.coordinates,
            };
          }
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error fetching data",
          });
        }
      }

      if (closest.coords.length !== 0) {
        await ctx.prisma.trip.create({
          data: {
            user_id: ctx.currentUser,
            tambal_ban_id: choosenTambalBanId!,
          },
        });
      }

      return {
        ...closest,
        duration: Math.floor(closest.duration / 60),
        distance: parseFloat((closest.distance / 1000).toFixed(2)),
      };
    }),
  cancelTrip: privateProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.trip.updateMany({
      where: { user_id: ctx.currentUser, status: "onprogress" },
      data: { status: "cancelled" },
    });
  }),
});
