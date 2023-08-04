import { useEffect, useState } from "react";
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

type Coords = {
  routes: [
    {
      geometry: {
        coordinates: number[][];
      };
    }
  ];
};

export default function Home() {
  const [start, setStart] = useState([-5.381616481622082, 105.25958596385435]);
  const [goal] = useState([-5.3800448416065025, 105.26457301928066]);
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
        geometry: { type: "Point", coordinates: [goal[1], goal[0]] },
      },
    ],
  };

  useEffect(() => {
    const getRoute = async () => {
      const mapboxDirectionsAPI = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[1]},${start[0]};${goal[1]},${goal[0]}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
      const response = await fetch(mapboxDirectionsAPI);

      if (!response.ok) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const data = (await response.json()) as Coords;
      const coords = data?.routes[0]?.geometry?.coordinates;
      setCoords(coords);
    };

    void getRoute();
  }, [start, goal]);

  return (
    <main className="flex h-screen items-center justify-center">
      <Map
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{ height: "100vh", width: "100vw" }}
      >
        <Source id="routeSource" type="geojson" data={routeSourceData}>
          <Layer
            id="roadLayer"
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
          position="bottom-right"
          showAccuracyCircle={false}
          trackUserLocation={true}
          style={{ marginBottom: 48 }}
          fitBoundsOptions={{ zoom: 15, duration: 2000 }}
          positionOptions={{ enableHighAccuracy: true }}
          onGeolocate={(e) => setStart([e.coords.latitude, e.coords.longitude])}
        />

        <NavigationControl position="bottom-right" />
        <Marker longitude={start[1]!} latitude={start[0]!} />
      </Map>
      <Navbar />
    </main>
  );
}
