import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import Map, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Source,
  Layer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TRPCError } from "@trpc/server";
import { Button } from "@/components/ui/button";

type Coords = {
  routes: [
    {
      geometry: {
        coordinates: number[][];
      };
    }
  ];
};

type Position = {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
};

export default function Home() {
  const geolocateControlRef = useRef(null);
  const [start, setStart] = useState<number[]>([
    -6.175280344843217, 106.82718040418617,
  ]); // I set the default location to Monas :v
  const [goal, setGoal] = useState<number[]>([]);
  const [coords, setCoords] = useState<number[][]>();
  const [viewState, setViewState] = useState({
    latitude: start[0],
    longitude: start[1],
    zoom: 15,
  });
  const routeSourceData = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: { type: "LineString", coordinates: coords },
      },
    ],
  };
  const goalSourceData = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: { type: "Point", coordinates: goal },
      },
    ],
  };

  function handleFindNearestTambalBan() {
    setGoal([105.26457301928066, -5.3800448416065025]);
    // @ts-ignore
    (geolocateControlRef.current as { trigger: void }).trigger();
  }

  function handleCancelFindNearestTambalBan() {
    setCoords([]);
    setGoal([]);
  }

  const getRoute = useCallback(async () => {
    if (goal?.length !== 0) {
      const mapboxDirectionsAPI = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[1]},${start[0]};${goal[0]},${goal[1]}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
      const response = await fetch(mapboxDirectionsAPI);
      if (!response.ok) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const data = (await response.json()) as Coords;
      const coords = data?.routes[0]?.geometry?.coordinates;
      setCoords(coords);
    }
  }, [goal, start]);

  function getUserLocation() {
    function onSuccess({ coords }: Position) {
      setStart([coords.latitude, coords.longitude]);
      setViewState((prevState) => ({
        ...prevState,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
    }
    function onError() {
      console.error("Error getting user location");
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else console.error("Geolocation is not supported by this browser.");
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (goal?.length !== 0) void getRoute();
  }, [goal, getRoute]);

  return (
    <main className="flex h-screen items-center justify-center">
      <Map
        {...viewState}
        reuseMaps={true}
        onMove={(e) => setViewState(e.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{ height: "100vh", width: "100vw" }}
      >
        <Source id="routeSource" type="geojson" data={routeSourceData}>
          <Layer
            id="routeLayer"
            type="line"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{
              "line-color": "#0D1282",
              "line-width": 7,
              "line-opacity": 1,
            }}
          />
        </Source>

        <Source id="goalSource" type="geojson" data={goalSourceData}>
          <Layer
            id="goalLayer"
            type="circle"
            paint={{
              "circle-radius": 13,
              "circle-color": "#0D1282",
              "circle-opacity": 1,
              "circle-stroke-color": "#EAEAEA",
              "circle-stroke-opacity": 1,
              "circle-stroke-width": 3,
            }}
          />
        </Source>

        <GeolocateControl
          ref={geolocateControlRef}
          position="bottom-right"
          trackUserLocation={true}
          showAccuracyCircle={false}
          style={{ marginBottom: 56 }}
          positionOptions={{ enableHighAccuracy: true }}
          fitBoundsOptions={{ zoom: 15, duration: 2000 }}
          onGeolocate={(e) => setStart([e.coords.latitude, e.coords.longitude])}
        />

        <NavigationControl position="bottom-right" />
        <Marker longitude={start[1]!} latitude={start[0]!} />
      </Map>

      {goal?.length !== 0 ? (
        <Button
          variant="destructive"
          className="absolute bottom-24"
          onClick={handleCancelFindNearestTambalBan}
        >
          Batal
        </Button>
      ) : (
        <Button
          className="absolute bottom-24"
          onClick={handleFindNearestTambalBan}
        >
          Cari Tambal Ban
        </Button>
      )}

      <Navbar />
    </main>
  );
}
