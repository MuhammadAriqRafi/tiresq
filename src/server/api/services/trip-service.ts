import { TRPCError } from "@trpc/server";
import { type Prisma } from "@/server/db";

type Coords = {
  routes: [
    {
      distance: number;
      duration: number;
      geometry: {
        coordinates: number[][];
      };
    },
  ];
};

type SearchDirectionsParams = {
  startLongitude: number;
  startLatitude: number;
  destinationLongitude: number;
  destinationLatitude: number;
};

export type ClosestTambalBan = {
  name: string;
  latitude: number;
  longitude: number;
  distance: string;
  duration: number;
  coords: number[][];
};

type Destination = {
  id: number;
  name: string;
  longitude: string;
  latitude: string;
};

type GetOnProgressTripProps = { prisma: Prisma; currentUserId: string };
type FindRouteProps = {
  startLatitude: number;
  startLongitude: number;
  destinationLongitude: number;
  destinationLatitude: number;
  destinationName: string;
};

export const searchDirections = async ({
  startLongitude,
  startLatitude,
  destinationLongitude,
  destinationLatitude,
}: SearchDirectionsParams): Promise<Coords> => {
  const mapboxDirectionsAPI = `https://api.mapbox.com/directions/v5/mapbox/walking/${startLongitude},${startLatitude};${destinationLongitude},${destinationLatitude}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

  const response = await fetch(mapboxDirectionsAPI);
  return (await response.json()) as Coords;
};

export const findRoute = async ({
  startLongitude,
  startLatitude,
  destinationLongitude,
  destinationLatitude,
  destinationName,
}: FindRouteProps): Promise<ClosestTambalBan> => {
  try {
    const {
      routes: [data],
    } = await searchDirections({
      startLongitude,
      startLatitude,
      destinationLongitude,
      destinationLatitude,
    });

    return {
      name: destinationName,
      latitude: destinationLatitude,
      longitude: destinationLongitude,
      distance: (data.distance / 1000).toFixed(2),
      duration: Math.floor(data.duration / 60),
      coords: data.geometry.coordinates,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Yah, lagi ada gangguan :(, coba lagi nanti yaa",
    });
  }
};

// const MAX_DISTANCE = 5;
export const findClosestDestination = async (
  allPotentialDestination: Destination[],
  currentUserCoordinate: { latitude: number; longitude: number },
) => {
  let choosenDestinationId = Infinity;
  let choosenDestination: ClosestTambalBan = {
    name: "",
    distance: "",
    latitude: Infinity,
    longitude: Infinity,
    duration: Infinity,
    coords: [],
  };

  for (const destination of allPotentialDestination) {
    try {
      const { id, name, longitude, latitude } = destination;
      const { distance, duration, coords } = await findRoute({
        destinationName: name,
        startLatitude: currentUserCoordinate.latitude,
        startLongitude: currentUserCoordinate.longitude,
        destinationLongitude: Number(longitude),
        destinationLatitude: Number(latitude),
      });

      // if (distance >= MAX_DISTANCE) continue;
      if (
        choosenDestination.distance === "" ||
        Number(distance) < Number(choosenDestination.distance)
      ) {
        choosenDestinationId = id;
        choosenDestination = {
          name,
          coords,
          distance,
          duration,
          latitude: Number(latitude),
          longitude: Number(longitude),
        };
      }
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Yah, lagi ada gangguan :(, coba lagi nanti yaa",
      });
    }
  }

  if (choosenDestination.coords.length < 1)
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message:
        "Maaf, kita belum bisa nemuin tambal ban dalam radius 5 kilometer dari lokasi kamu",
    });

  return { choosenDestination, choosenDestinationId };
};

export const getOnProgressTrip = async ({
  prisma,
  currentUserId,
}: GetOnProgressTripProps) => {
  return await prisma.trip.findFirst({
    where: { user_id: currentUserId, status: "onprogress" },
    select: {
      destination: {
        select: { id: true, name: true, longitude: true, latitude: true },
      },
    },
  });
};
