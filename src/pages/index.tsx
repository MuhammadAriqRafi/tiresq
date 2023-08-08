import Map, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Source,
  Layer,
} from "react-map-gl";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Info, Loader2, Search } from "lucide-react";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import Navbar from "@/components/navbar";
import "mapbox-gl/dist/mapbox-gl.css";
import ActiveTrip from "@/components/home/active-trip";

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
  const [coords, setCoords] = useState<number[][]>([]);
  const [onTrip, setOnTrip] = useState<boolean>(false);
  const [isGeolocationPermitted, setIsGeolocationPermitted] =
    useState<boolean>(false);
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
  const { data, isFetching, isError, error } = api.trips.startTrip.useQuery(
    {
      currentLocation: {
        latitude: start[0] ?? null,
        longitude: start[1] ?? null,
      },
    },
    { enabled: onTrip }
  );

  const handleCancelFindNearestTambalBan = useCallback(() => {
    setOnTrip(false);
    setCoords([]);
    setGoal([]);

    // @ts-ignore
    (geolocateControlRef.current as { trigger: void }).trigger();
  }, []);

  function handleFindNearestTambalBan() {
    setOnTrip(true);

    // @ts-ignore
    (geolocateControlRef.current as { trigger: void }).trigger();
  }

  function getUserLocation() {
    function onSuccess({ coords }: Position) {
      setIsGeolocationPermitted(true);
      setStart([coords.latitude, coords.longitude]);
      setViewState((prevState) => ({
        ...prevState,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
    }

    function onError() {
      const { latitude, longitude } = {
        latitude: -5.358125429208756,
        longitude: 105.31483876684943,
      }; // I set the default location to Insitute Technology of Sumatera

      setStart([latitude, longitude]);
      setViewState((prevState) => ({
        ...prevState,
        longitude,
        latitude,
        zoom: 10,
      }));

      console.error("Error getting user location");
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } pointer-events-auto flex w-full max-w-md items-center gap-4 rounded-lg bg-white py-4 pl-4 shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            <Info className="self-start" size={24} />
            <p className="text-label font-semibold">
              Yah... kita gak dapet izin akses lokasi kamu :(, coba ganti izin
              akses lokasi browser kamu{" "}
              <a
                target="_blank"
                className="text-blue-400 underline"
                href="https://support.google.com/chrome/answer/114662?hl=en"
              >
                disini
              </a>
            </p>
            <div className="ml-auto flex border-l border-gray-200">
              <Button variant="link" onClick={() => toast.dismiss(t.id)}>
                Close
              </Button>
            </div>
          </div>
        ),
        {
          position: "top-center",
          duration: Infinity,
        }
      );
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else console.error("Geolocation is not supported by this browser.");
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (data && onTrip) {
      const latitude = parseFloat(data.latitude);
      const longitude = parseFloat(data.longitude);
      setGoal([longitude, latitude]);
      setCoords(data.coords);
    }
  }, [isFetching, data, onTrip]);

  if (isError && error.data?.httpStatus === 500)
    toast.error("Yah, lagi ada gangguan :(, coba lagi nanti yaa", {
      duration: Infinity,
      position: "top-center",
    });

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden">
      <Map
        {...viewState}
        reuseMaps={true}
        style={{ height: "100vh", width: "100vw" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onMove={(e) => {
          if (!isError) setViewState(e.viewState);
        }}
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
          fitBoundsOptions={{ zoom: 15 }}
          style={{ position: "fixed", bottom: 184 }}
          positionOptions={{ enableHighAccuracy: true }}
          onGeolocate={(e) => setStart([e.coords.latitude, e.coords.longitude])}
        />
        <NavigationControl
          position="bottom-right"
          style={{ position: "fixed", bottom: 88 }}
        />

        {isGeolocationPermitted ? (
          <Marker longitude={start[1]!} latitude={start[0]!} />
        ) : null}
      </Map>

      {onTrip && !isFetching ? (
        <ActiveTrip
          tambalBanName={data?.name}
          distance={data?.distance}
          duration={data?.duration}
          onCancel={handleCancelFindNearestTambalBan}
        />
      ) : null}

      {!onTrip && isGeolocationPermitted ? (
        <Button
          className="fixed bottom-24 flex gap-2"
          onClick={handleFindNearestTambalBan}
          size="lg"
        >
          {isFetching ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Search size={20} />
          )}
          Cari Tambal Ban
        </Button>
      ) : null}

      {onTrip && isFetching ? (
        <Button className="fixed bottom-24" variant="outline" size="icon">
          <Loader2 className="animate-spin" size={20} />
        </Button>
      ) : null}

      <Navbar />
    </main>
  );
}
