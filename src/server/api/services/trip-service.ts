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
