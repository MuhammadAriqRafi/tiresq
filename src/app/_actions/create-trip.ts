"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/server/db";
import { generateResponse } from "@/lib/utils/utils";
import { getOnProgressTripDetails } from "./utils";
import { type OnProgressTripOutputType } from "./get-on-progress-trip";

const createTripInputSchema = z.object({
  userCurrentCoordinate: z.object({
    longitude: z.number(),
    latitude: z.number(),
  }),
});

type CreateTripInputSchemaType = z.infer<typeof createTripInputSchema>;

export const createTrip = async ({
  userCurrentCoordinate,
}: CreateTripInputSchemaType) => {
  const action = async () => {
    const { choosenTireRepairShop, choosenTireRepairShopDirections } =
      await findNearestTireRepairShop(userCurrentCoordinate);

    if (choosenTireRepairShopDirections.coords.length < 1)
      return {
        status: 409,
        message:
          "Maaf, kita belum bisa nemuin tambal ban dalam radius 5 kilometer dari lokasi kamu",
        data: null,
      };

    const { userId } = auth();

    if (userId === null)
      return {
        status: 200,
        message: null,
        data: {
          id: Infinity,
          destination: {
            name: choosenTireRepairShop.name,
            rating: choosenTireRepairShop.rating,
            latitude: choosenTireRepairShop.latitude,
            longitude: choosenTireRepairShop.longitude,
          },
          detail: {
            duration: choosenTireRepairShopDirections.duration,
            distance: choosenTireRepairShopDirections.distance,
            coords_to_destination: choosenTireRepairShopDirections.coords,
          },
        } satisfies OnProgressTripOutputType["data"],
      };

    const newlyCreatedTripId = await prisma.$transaction(
      async (PrismaClient) => {
        const { id: newlyCreatedTripDetailId } =
          await PrismaClient.tripDetail.create({
            select: { id: true },
            data: {
              distance: choosenTireRepairShopDirections.distance,
              duration: choosenTireRepairShopDirections.duration,
              coords_to_destination: choosenTireRepairShopDirections.coords,
            },
          });

        const { id: newlyCreatedTripId } = await PrismaClient.trip.create({
          select: { id: true },
          data: {
            user_id: userId,
            tire_repair_shop_id: choosenTireRepairShop.id,
            trip_detail_id: newlyCreatedTripDetailId,
          },
        });

        return newlyCreatedTripId;
      },
    );

    return {
      status: 200,
      message: null,
      data: await getOnProgressTripDetails(newlyCreatedTripId),
    };
  };

  return await generateResponse<ActionResponseDataType<typeof action>>(action);
};

const findNearestTireRepairShop = async (userCurrentCoordinate: LatLng) => {
  const tireRepairShops = await prisma.tireRepairShop.findMany({
    select: {
      id: true,
      name: true,
      rating: true,
      latitude: true,
      longitude: true,
    },
  });

  if (tireRepairShops.length < 1)
    throw new Error("Tire repair shop still unavailable");

  // find user region first
  // add region attribute to tambal ban
  // get only tambal ban that has the same region as the user
  // start filtering the nearest tambal ban based on user region

  let choosenTireRepairShop: Destination = {
    id: Infinity,
    name: "",
    rating: Infinity,
    latitude: Infinity,
    longitude: Infinity,
  };

  let choosenTireRepairShopDirections: Directions = {
    distance: Infinity,
    duration: Infinity,
    coords: [[Infinity]],
  };

  for (const tireRepairShop of tireRepairShops) {
    const { id, name, rating, longitude, latitude } = tireRepairShop;
    const { distance, duration, coords } = await getDirections({
      startLatitude: userCurrentCoordinate.latitude,
      startLongitude: userCurrentCoordinate.longitude,
      destinationLatitude: latitude,
      destinationLongitude: longitude,
    });

    if (distance < choosenTireRepairShopDirections.distance) {
      choosenTireRepairShop = {
        id,
        name,
        rating,
        latitude,
        longitude,
      };
      choosenTireRepairShopDirections = {
        coords,
        distance,
        duration,
      };
    }
  }

  return { choosenTireRepairShop, choosenTireRepairShopDirections };
};

const getDirections = async ({
  startLatitude,
  startLongitude,
  destinationLatitude,
  destinationLongitude,
}: GetRouteProps): Promise<Directions> => {
  const mapboxDirectionsAPI = `https://api.mapbox.com/directions/v5/mapbox/walking/${startLongitude},${startLatitude};${destinationLongitude},${destinationLatitude}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
  const mapboxDirectionsAPIResponse = await fetch(mapboxDirectionsAPI);
  const {
    routes: [data],
  } = (await mapboxDirectionsAPIResponse.json()) as Coords;

  return {
    coords: data.geometry.coordinates,
    duration: Math.floor(data.duration / 60),
    distance: Number((data.distance / 1000).toFixed(1)),
  };
};
