import useGeolocation from "@/app/_hooks/useGeolocation";
import { tripStore } from "@/lib/store/trip-store";
import { useEffect, useState, useRef } from "react";

export default function useHomeMap() {
  const {
    isGeolocationError,
    isGeolocationPermitted,
    setUserCurrentCoordinate,
    userCurrentCoordinate,
  } = useGeolocation();

  const geolocateControlRef = useRef(null);
  const [destination] = tripStore(({ destination }) => [destination]);
  const [mapViewState, setMapViewState] = useState({
    zoom: 10,
    latitude: userCurrentCoordinate.latitude,
    longitude: userCurrentCoordinate.longitude,
  });

  useEffect(() => {
    if (geolocateControlRef.current !== null)
      (geolocateControlRef.current as { trigger: () => void }).trigger();
  }, [destination]);

  useEffect(() => {
    if (!isGeolocationError)
      setMapViewState((prevState) => ({
        ...prevState,
        zoom: 15,
        latitude: userCurrentCoordinate.latitude,
        longitude: userCurrentCoordinate.longitude,
      }));
  }, [userCurrentCoordinate, isGeolocationError]);

  return {
    destination,
    mapViewState,
    setMapViewState,
    geolocateControlRef,
    userCurrentCoordinate,
    isGeolocationPermitted,
    setUserCurrentCoordinate,
  };
}
