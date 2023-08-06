import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
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

export const tripsRouter = createTRPCRouter({
  getTrip: privateProcedure
    .input(
      z
        .object({
          historyId: z.number(),
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
  startTrip: publicProcedure
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
      const allTambalBan = await ctx.prisma.tambalBan.findMany({
        select: {
          name: true,
          longitude: true,
          latitude: true,
        },
      });

      // find user region first
      // add region attribute to tambal ban
      // get only tambal ban that has the same region as the user
      // start filtering the nearest tambal ban based on user region

      if (
        input.currentLocation.latitude === null ||
        input.currentLocation.longitude === null
      )
        return closest;

      for (const tambalBan of allTambalBan) {
        try {
          const { longitude, latitude, name } = tambalBan;
          const mapboxDirectionsAPI = `https://api.mapbox.com/directions/v5/mapbox/walking/${userLongitude},${userLatitude};${longitude},${latitude}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

          const response = await fetch(mapboxDirectionsAPI);
          const data = (await response.json()) as Coords;
          const distance = data?.routes[0]?.distance;

          if (distance < closest.distance) {
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

      return {
        ...closest,
        duration: Math.floor(closest.duration / 60),
        distance: parseFloat((closest.distance / 1000).toFixed(2)),
      };
    }),
});
