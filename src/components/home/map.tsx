import Mapbox, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Source,
  Layer,
} from "react-map-gl";
import { useEffect, useRef, useState } from "react";
import { type LatLng } from "@/lib/hooks/useGeolocation";

type Props = {
  isGeolocationError: boolean;
  isGeolocationPermitted: boolean;
  isFetchingDestination: boolean;
  userCurrentCoordinate: LatLng;
  isOnTrip: boolean;
  destination?: {
    latitude?: string;
    longitude?: string;
    coords?: number[][];
  };
  onGeolocate: (coord: LatLng) => void;
};

export default function HomeMap({
  isGeolocationPermitted,
  userCurrentCoordinate,
  isFetchingDestination,
  isGeolocationError,
  onGeolocate,
  destination,
  isOnTrip,
}: Props) {
  const geolocateControlRef = useRef(null);
  const [viewState, setViewState] = useState({
    zoom: 10,
    latitude: userCurrentCoordinate.latitude,
    longitude: userCurrentCoordinate.longitude,
  });
  const goalSourceData = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "Point",
          coordinates:
            isOnTrip && destination
              ? [destination.longitude, destination.latitude]
              : [],
        },
      },
    ],
  };
  const routeSourceData = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "LineString",
          coordinates:
            isOnTrip && destination?.coords && !isFetchingDestination
              ? destination?.coords
              : [],
        },
      },
    ],
  };

  useEffect(() => {
    if (geolocateControlRef.current !== null)
      (geolocateControlRef.current as { trigger: () => void }).trigger();
  }, [isOnTrip, geolocateControlRef.current]);

  useEffect(() => {
    if (!isGeolocationError)
      setViewState((prevState) => ({
        ...prevState,
        zoom: 15,
        latitude: userCurrentCoordinate.latitude,
        longitude: userCurrentCoordinate.longitude,
      }));
  }, [userCurrentCoordinate, isGeolocationError]);

  return (
    <Mapbox
      {...viewState}
      reuseMaps={true}
      style={{ height: "100vh", width: "100vw" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onMove={(e) => setViewState(e.viewState)}
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
        trackUserLocation={false}
        showAccuracyCircle={false}
        fitBoundsOptions={{ zoom: 15 }}
        style={{ position: "fixed", bottom: 184 }}
        positionOptions={{ enableHighAccuracy: true }}
        onGeolocate={(e) =>
          onGeolocate({
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
          })
        }
      />
      <NavigationControl
        position="bottom-right"
        style={{ position: "fixed", bottom: 88 }}
      />

      {isGeolocationPermitted ? (
        <Marker
          latitude={userCurrentCoordinate.latitude}
          longitude={userCurrentCoordinate.longitude}
        />
      ) : null}
    </Mapbox>
  );
}
