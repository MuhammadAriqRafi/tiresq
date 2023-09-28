import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

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

export type LatLng = {
  latitude: number;
  longitude: number;
};

export default function useGeolocation() {
  const [isGeolocationError, setIsGeolocationError] = useState<
    boolean | undefined
  >();
  const [isGeolocationPermitted, setIsGeolocationPermitted] = useState(false);
  const [userCurrentCoordinate, setUserCurrentCoordinate] = useState<LatLng>({
    latitude: -5.358125429208756,
    longitude: 105.31483876684943,
  }); // I set the default location to Insitute Technology of Sumatera

  const getUserLocation = () => {
    function onSuccess({ coords }: Position) {
      setIsGeolocationPermitted(true);
      setIsGeolocationError(false);
      setUserCurrentCoordinate({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }

    function onError() {
      setIsGeolocationError(true);
    }

    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    else {
      console.error("Geolocation is not supported by this browser.");
      toast.error(
        "Yah, fitur geolokasi gak disupport di browser ini, coba pakai browser lain",
        {
          position: "top-center",
        },
      );
    }
  };

  useEffect(() => getUserLocation(), []);

  return {
    userCurrentCoordinate,
    setUserCurrentCoordinate,
    isGeolocationPermitted,
    isGeolocationError,
  };
}
