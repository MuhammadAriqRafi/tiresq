"use client";

import Maps from "./maps";
import useGeolocation from "@/app/_hooks/use-geolocation";

export default function MapsIndex() {
  const { userCurrentCoordinate, isGeolocationPermitted } = useGeolocation();

  return (
    <Maps
      isGeolocationPermitted={isGeolocationPermitted}
      userCurrentCoordinate={userCurrentCoordinate}
    />
  );
}
