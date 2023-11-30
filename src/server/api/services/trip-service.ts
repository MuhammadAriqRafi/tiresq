"use server";

import { auth } from "@clerk/nextjs";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { generateResponse } from "@/lib/utils/utils";
import { type CreateTripInputSchemaType } from "../input-schemas/trips-input-schema";

export type OnProgressTripType = Awaited<ReturnType<typeof getOnProgressTrip>>;

export const getOnProgressTrip = async ({
  userId,
}: GetOnProgressTripParams) => {
  const action = async () => {
    const onProgressTrip = await prisma.trip.findFirst({
      where: { user_id: userId, status: "onprogress" },
      select: { id: true },
    });

    if (onProgressTrip === null)
      return {
        status: 200,
        message: "Kamu sedang tidak mencari tambal ban",
        data: onProgressTrip,
      };

    const onProgressTripDetails = await getOnProgressTripDetails(
      onProgressTrip.id,
    );

    return {
      status: 200,
      message: null,
      data: onProgressTripDetails,
    };
  };

  return await generateResponse<ActionResponseDataType<typeof action>>(action);
};

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
        } satisfies OnProgressTripType["data"],
      };

    const newlyCreatedTripId = await prisma.$transaction(
      async (PrismaClient) => {
        const { id: newlyCreatedTripId } = await PrismaClient.trip.create({
          select: { id: true },
          data: {
            user_id: userId,
            tire_repair_shop_id: choosenTireRepairShop.id,
          },
        });

        await PrismaClient.tripDetail.create({
          data: {
            trip_id: newlyCreatedTripId,
            distance: choosenTireRepairShopDirections.distance,
            duration: choosenTireRepairShopDirections.duration,
            coords_to_destination: choosenTireRepairShopDirections.coords,
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

export const cancelTrip = (tripId: number) =>
  generateResponse<null>(async () => {
    const { userId } = auth();

    if (userId === null)
      return {
        status: 403,
        message: "Kamu harus login terlebih dahulu",
        data: null,
      };

    await prisma.trip.update({
      where: { id: tripId },
      data: { status: "cancelled" },
    });

    revalidatePath("/");

    return {
      status: 200,
      message: "Berhasil batalin perjalanan",
      data: null,
    };
  });

export const completeTrip = (tripId: number) =>
  generateResponse<null>(async () => {
    const { userId } = auth();

    if (userId === null)
      return {
        status: 403,
        message: "Kamu harus login terlebih dahulu",
        data: null,
      };

    await prisma.$transaction(async (PrismaClient) => {
      const currentTrip = await PrismaClient.trip.findUniqueOrThrow({
        where: { id: tripId },
        select: { tire_repair_shop_id: true },
      });

      const { id: newlyCreatedRatingId } = await PrismaClient.rating.create({
        select: { id: true },
        data: {
          tire_repair_shop: {
            connect: { id: currentTrip?.tire_repair_shop_id },
          },
        },
      });

      const { id: newlyCreatedReviewId } = await PrismaClient.review.create({
        select: { id: true },
        data: {
          tire_repair_shop: {
            connect: { id: currentTrip?.tire_repair_shop_id },
          },
        },
      });

      await PrismaClient.trip.update({
        where: { id: tripId },
        data: {
          status: "completed",
          rating: { connect: { id: newlyCreatedRatingId } },
          review: { connect: { id: newlyCreatedReviewId } },
        },
      });
    });

    revalidatePath("/");

    return {
      status: 200,
      message: "Yay, kamu sudah sampai ditujuan",
      data: null,
    };
  });

const getOnProgressTripDetails = async (tripId: number) =>
  await prisma.trip.findUniqueOrThrow({
    where: { id: tripId },
    select: {
      id: true,
      destination: {
        select: {
          name: true,
          latitude: true,
          longitude: true,
          rating: true,
        },
      },
      detail: {
        select: {
          duration: true,
          distance: true,
          coords_to_destination: true,
        },
      },
    },
  });

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
