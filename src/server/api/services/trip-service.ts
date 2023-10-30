"use server";

import { auth } from "@clerk/nextjs";
import { prisma } from "@/server/db";
import { generateResponse } from "@/lib/utils/utils";
import { type CreateTripInputSchemaType } from "../input-schemas/trips-input-schema";

export const getOnProgressTrip = async ({
  currentUserId,
}: GetOnProgressTripProps) => {
  return await prisma.trip.findFirst({
    where: { user_id: currentUserId, status: "onprogress" },
    select: {
      id: true,
      destination: {
        select: { id: true, name: true, longitude: true, latitude: true },
      },
    },
  });
};

export const createTrip = async ({
  userCurrentCoordinate,
}: CreateTripInputSchemaType) =>
  generateResponse(
    async (): Promise<GenerateResponseOutput<TripDetails | null>> => {
      const { choosenTireRepairShop, choosenTireRepairShopDirections } =
        await findNearestTireRepairShop(userCurrentCoordinate);

      if (choosenTireRepairShopDirections.coords.length < 1)
        return {
          isError: true,
          data: null,
          message:
            "Maaf, kita belum bisa nemuin tambal ban dalam radius 5 kilometer dari lokasi kamu",
        };

      const { userId } = auth();
      let tripDetails: TripDetails;
      const createTripDetailsParams = {
        tripId: null,
        userCurrentCoordinate,
        destination: choosenTireRepairShop,
        directions: choosenTireRepairShopDirections,
      };

      if (userId !== null) {
        const { id: newTripId } = await prisma.trip.create({
          data: {
            user_id: userId,
            tambal_ban_id: choosenTireRepairShop.id,
          },
        });

        tripDetails = await createTripDetails({
          ...createTripDetailsParams,
          tripId: newTripId,
        });
      } else tripDetails = await createTripDetails(createTripDetailsParams);

      return {
        isError: false,
        data: tripDetails,
        message: null,
      };
    },
  );

export const createTripDetails = async ({
  tripId,
  directions,
  destination,
  userCurrentCoordinate,
}: CreateTripDetails) => {
  const { latitude, longitude, name } = destination;
  let tripDetails: TripDetails = {
    tripId,
    tripDistance: "",
    tripDuration: Infinity,
    destinationName: name,
    destinationLatitude: Number(latitude),
    destinationLongitude: Number(longitude),
    coordsToDestination: [[Infinity]],
  };

  if (directions) {
    tripDetails = {
      ...tripDetails,
      tripDuration: directions.duration,
      tripDistance: directions.distance,
      coordsToDestination: directions.coords,
    };
  } else {
    const { distance, duration, coords } = await getDirections({
      startLatitude: userCurrentCoordinate.latitude,
      startLongitude: userCurrentCoordinate.longitude,
      destinationLatitude: Number(latitude),
      destinationLongitude: Number(longitude),
    });

    tripDetails = {
      ...tripDetails,
      tripDuration: duration,
      tripDistance: distance,
      coordsToDestination: coords,
    };
  }

  return tripDetails;
};

export const cancelTrip = (tripId: number) =>
  generateResponse(async (): Promise<GenerateResponseOutput<null>> => {
    const { userId } = auth();
    if (userId === null)
      return {
        isError: true,
        message: "Kamu harus login terlebih dahulu",
        data: null,
      };

    await prisma.trip.update({
      where: { id: tripId },
      data: { status: "cancelled" },
    });

    return {
      isError: false,
      message: "Berhasil batalin perjalanan",
      data: null,
    };
  });

export const completeTrip = (tripId: number) =>
  generateResponse(async (): Promise<GenerateResponseOutput<null>> => {
    const { userId } = auth();
    if (userId === null)
      return {
        isError: true,
        message: "Kamu harus login terlebih dahulu",
        data: null,
      };

    await prisma.$transaction(async () => {
      const { id: newlyCreatedRatingId } = await prisma.rating.create({
        select: { id: true },
      });

      const { id: newlyCreatedReviewId } = await prisma.review.create({
        select: { id: true },
      });

      await prisma.trip.update({
        where: { id: tripId },
        data: {
          status: "completed",
          rating: { connect: { id: newlyCreatedRatingId } },
          review: { connect: { id: newlyCreatedReviewId } },
        },
      });
    });

    return {
      isError: false,
      message: "Yay, kamu sudah sampai ditujuan",
      data: null,
    };
  });

const findNearestTireRepairShop = async (userCurrentCoordinate: LatLng) => {
  const allTireRepairShop = await prisma.tambalBan.findMany({
    select: {
      id: true,
      name: true,
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
    longitude: Infinity,
    latitude: Infinity,
  };

  let choosenTireRepairShopDirections: Directions = {
    distance: "",
    duration: Infinity,
    coords: [[Infinity]],
  };

  for (const tireRepairShop of allTireRepairShop) {
    const { id, name, longitude, latitude } = tireRepairShop;
    const { distance, duration, coords } = await getDirections({
      startLatitude: userCurrentCoordinate.latitude,
      startLongitude: userCurrentCoordinate.longitude,
      destinationLatitude: Number(latitude),
      destinationLongitude: Number(longitude),
    });

    if (
      choosenTireRepairShopDirections.distance === "" ||
      Number(distance) < Number(choosenTireRepairShopDirections.distance)
    ) {
      choosenTireRepairShop = {
        id,
        name,
        latitude: Number(latitude),
        longitude: Number(longitude),
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
    distance: (data.distance / 1000).toFixed(2),
  };
};
