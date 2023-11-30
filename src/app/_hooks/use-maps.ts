import { geolocationStore } from "@/lib/store/geolocation-store";
import { tripStore } from "@/lib/store/trip-store";
import { useEffect, useState, useRef } from "react";

export default function useMaps({ userCurrentCoordinate }: UseMapsParams) {
  const [trip] = tripStore(({ trip }) => [trip]);
  const [setUserCurrentCoordinate] = geolocationStore(
    ({ setUserCurrentCoordinate }) => [setUserCurrentCoordinate],
  );
  const [mapViewState, setMapViewState] = useState<MapViewState>({
    zoom: 14,
    latitude: userCurrentCoordinate.latitude,
    longitude: userCurrentCoordinate.longitude,
  });
  const geolocateControlRef = useRef(null);

  useEffect(() => {
    if (geolocateControlRef.current !== null)
      (geolocateControlRef.current as { trigger: () => void }).trigger();
  }, [trip]);

  useEffect(() => {
    setMapViewState((prevState) => ({
      ...prevState,
      latitude: userCurrentCoordinate.latitude,
      longitude: userCurrentCoordinate.longitude,
    }));
  }, [userCurrentCoordinate]);

  return {
    trip,
    mapViewState,
    setMapViewState,
    geolocateControlRef,
    setUserCurrentCoordinate,
  };
}
