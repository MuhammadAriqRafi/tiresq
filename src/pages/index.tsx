import Map, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Source,
  Layer,
} from "react-map-gl";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Footprints, Hourglass, Info, Search } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import Navbar from "@/components/navbar";
import "mapbox-gl/dist/mapbox-gl.css";

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
  const [goal, setGoal] = useState<number[]>([]);
  const [start, setStart] = useState<number[]>([]);
  const [currentPosition, setCurrentPosition] = useState<number[]>([]);
  const [coords, setCoords] = useState<number[][]>();
  const [viewState, setViewState] = useState({ zoom: 15 });
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
  const { data } = api.trips.startTrip.useQuery({
    currentLocation: {
      latitude: start[0] ?? null,
      longitude: start[1] ?? null,
    },
  });
  const ActiveTrip = ({
    distance,
    duration,
    tambal_ban_name,
  }: {
    distance?: number;
    duration?: number;
    tambal_ban_name?: string;
  }) => {
    return (
      <section className="border-b-1 absolute top-0 flex h-fit w-screen items-center justify-between rounded-b-2xl border-b-gray-300 bg-white px-6 py-4 shadow-md">
        <section className="flex flex-col gap-3">
          <h1 className="text-subheading">{tambal_ban_name}</h1>
          <div className="flex gap-3">
            <p className="text-label flex gap-1 font-medium text-gray-500">
              <Footprints size={16} /> {distance ?? 0} Km
            </p>
            <p className="text-label flex gap-1 font-medium text-gray-500">
              <Hourglass size={16} /> {duration ?? 0} Min
            </p>
          </div>
        </section>
        <Separator orientation="vertical" className="h-9 w-[1px] bg-border" />
        <section className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-red-500 text-red-500"
              >
                Batalin
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-8" side="bottom">
              <SheetHeader>
                <SheetTitle className="text-left text-lg font-semibold">
                  Yakin mau batalin perjalanan ?
                </SheetTitle>
              </SheetHeader>

              <SheetFooter className="flex w-full flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-grow"
                  onClick={handleCancelFindNearestTambalBan}
                >
                  Yakin
                </Button>
                <SheetClose asChild>
                  <Button type="submit" className="flex-grow">
                    Tidak
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button
            size="sm"
            className="bg-green-600"
            onClick={() => {
              toast("Fiturnya masih dalam tahap pengembangan yaa :)", {
                icon: <Info />,
              });
            }}
          >
            Sampai
          </Button>
        </section>
      </section>
    );
  };

  function handleFindNearestTambalBan() {
    const latitude = parseFloat(data!.latitude);
    const longitude = parseFloat(data!.longitude);
    setGoal([longitude, latitude]);
    setCoords(data!.coords);

    // @ts-ignore
    (geolocateControlRef.current as { trigger: void }).trigger();
  }
  function handleCancelFindNearestTambalBan() {
    setCoords([]);
    setGoal([]);

    // @ts-ignore
    (geolocateControlRef.current as { trigger: void }).trigger();
  }
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
    let watchId = 4;

    if (navigator.geolocation) {
      const options = {
        maximumAge: 0, // Don't use a cached position
        timeout: 5000, // Set a timeout for the request (in milliseconds)
        enableHighAccuracy: true, // Use high accuracy if available
      };

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // Use the latitude and longitude to update the geolocation on the map
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error watching user location:", error);
        },
        options
      );
    } else console.error("Geolocation is not supported by this browser.");

    console.log(currentPosition);

    return navigator.geolocation.clearWatch(watchId);
  }, [currentPosition]);

  if (!data) return <h1>Something went wrong</h1>;

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
          style={{ position: "absolute", bottom: 184 }}
          positionOptions={{ enableHighAccuracy: true }}
          fitBoundsOptions={{ zoom: 15 }}
          onGeolocate={(e) => setStart([e.coords.latitude, e.coords.longitude])}
        />

        <NavigationControl
          position="bottom-right"
          style={{ position: "absolute", bottom: 88 }}
        />

        {start.length !== 0 ? (
          <Marker longitude={start[1]!} latitude={start[0]!} />
        ) : null}
      </Map>

      {goal?.length !== 0 ? (
        <>
          <ActiveTrip
            tambal_ban_name={data.name}
            distance={data.distance}
            duration={data.duration}
          />
        </>
      ) : (
        <Button
          className="absolute bottom-24 flex gap-2"
          onClick={handleFindNearestTambalBan}
          size="lg"
        >
          <Search size={20} />
          Cari Tambal Ban
        </Button>
      )}

      <Navbar />
    </main>
  );
}
