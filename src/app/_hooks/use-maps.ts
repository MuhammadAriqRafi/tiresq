import { tripStore } from "@/lib/store/trip-store";
import { useEffect, useState, useRef } from "react";

export default function useMaps({ userCurrentCoordinate }: UseMapsParams) {
  const [trip] = tripStore(({ trip }) => [trip]);
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
    if (geolocateControlRef.current !== null)
      (geolocateControlRef.current as { trigger: () => void }).trigger();
  }, [geolocateControlRef.current]);

  return {
    trip,
    mapViewState,
    setMapViewState,
    geolocateControlRef,
  };
}
