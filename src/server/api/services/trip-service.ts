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

type SearchDirectionsParams = {
  startLongitude: number;
  startLatitude: number;
  goalLongitude: string;
  goalLatitude: string;
};

type ClosestTambalBan = {
  name: string;
  latitude: string;
  longitude: string;
  distance: number;
  duration: number;
  coords: number[][];
};

type Destination = {
  id: number;
  name: string;
  longitude: string;
  latitude: string;
};

export const searchDirections = async ({
  startLongitude,
  startLatitude,
  goalLongitude,
  goalLatitude,
}: SearchDirectionsParams): Promise<Coords> => {
  const mapboxDirectionsAPI = `https://api.mapbox.com/directions/v5/mapbox/walking/${startLongitude},${startLatitude};${goalLongitude},${goalLatitude}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

  const response = await fetch(mapboxDirectionsAPI);
  return (await response.json()) as Coords;
};

// const MAX_DISTANCE = 5;
export const findClosestDestination = async (
  allPotentialDestination: Destination[],
  currentUserCoordinate: { latitude: number; longitude: number }
) => {
  let choosenDestinationId = Infinity;
  let choosenDestination: ClosestTambalBan = {
    name: "",
    latitude: "",
    longitude: "",
    distance: Infinity,
    duration: Infinity,
    coords: [],
  };

  for (const destination of allPotentialDestination) {
    try {
      const { id, name, longitude, latitude } = destination;
      const data = await searchDirections({
        startLongitude: currentUserCoordinate.longitude,
        startLatitude: currentUserCoordinate.latitude,
        goalLongitude: longitude,
        goalLatitude: latitude,
      });
      const distance = parseFloat(
        (data?.routes[0]?.distance / 1000).toFixed(2)
      );

      // if (distance >= MAX_DISTANCE) continue;
      if (distance < choosenDestination.distance) {
        choosenDestinationId = id;
        choosenDestination = {
          name,
          latitude,
          longitude,
          distance,
          duration: Math.floor(data.routes[0].duration / 60),
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

  if (choosenDestination.coords.length < 1)
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message:
        "Maaf, kita belum bisa nemuin tambal ban dalam radius 5 kilometer dari lokasi kamu",
    });

  return { choosenDestination, choosenDestinationId };
};
