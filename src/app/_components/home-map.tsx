"use client";

import Mapbox, {
  Layer,
  Marker,
  Source,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import toast from "react-hot-toast";
import useTrip from "@/lib/hooks/useTrip";
import useGeolocation from "@/lib/hooks/useGeolocation";
import { useEffect, useState, useRef } from "react";
import { tripStore } from "@/lib/store/trip-store";

type HomeMapProps = { isOnTrip: boolean };

export default function HomeMap({ isOnTrip }: HomeMapProps) {
  const { destination, isOnTrip: isOnTripFromStore } = tripStore(
    ({ destination, isOnTrip }) => ({
      destination,
      isOnTrip,
    }),
  );

  const {
    isGeolocationError,
    isGeolocationPermitted,
    setUserCurrentCoordinate,
    userCurrentCoordinate,
  } = useGeolocation();
  useTrip({ isOnTrip });

  const geolocateControlRef = useRef(null);
  const [viewState, setViewState] = useState({
    zoom: 10,
    latitude: userCurrentCoordinate.latitude,
    longitude: userCurrentCoordinate.longitude,
  });

  useEffect(() => {
    if (geolocateControlRef.current !== null)
      (geolocateControlRef.current as { trigger: () => void }).trigger();
  }, [isOnTripFromStore]);

  useEffect(() => {
    if (!isGeolocationError)
      setViewState((prevState) => ({
        ...prevState,
        zoom: 15,
        latitude: userCurrentCoordinate.latitude,
        longitude: userCurrentCoordinate.longitude,
      }));
    else {
      console.error("Error getting user location");
      toast.error("Yah... kita gak dapet izin akses lokasi kamu :(", {
        position: "top-center",
      });
    }
  }, [userCurrentCoordinate, isGeolocationError]);

  return (
    <Mapbox
      {...viewState}
      reuseMaps={true}
      style={{ height: "100vh", width: "100vw" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onMove={(event) => setViewState(event.viewState)}
    >
      {destination ? (
        <>
          <Source
            id="routeSource"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: [],
                  geometry: {
                    type: "LineString",
                    coordinates: destination.coords,
                  },
                },
              ],
            }}
          >
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
          <Source
            id="goalSource"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: [],
                  geometry: {
                    type: "Point",
                    coordinates: [
                      Number(destination.longitude),
                      Number(destination.latitude),
                    ],
                  },
                },
              ],
            }}
          >
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
        </>
      ) : null}

      <GeolocateControl
        ref={geolocateControlRef}
        position="bottom-right"
        trackUserLocation={false}
        showAccuracyCircle={false}
        fitBoundsOptions={{ zoom: 15 }}
        positionOptions={{ enableHighAccuracy: true }}
        style={{ position: "fixed", bottom: 184, right: 8 }}
        onGeolocate={(event) =>
          setUserCurrentCoordinate({
            latitude: event.coords.latitude,
            longitude: event.coords.longitude,
          })
        }
      />
      <NavigationControl
        position="bottom-right"
        style={{ position: "fixed", bottom: 88, right: 8 }}
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
