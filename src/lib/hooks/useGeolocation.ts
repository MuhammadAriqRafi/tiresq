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
  const [isGeolocationError, setIsGeolocationError] = useState<boolean>(true);
  const [isGeolocationPermitted, setIsGeolocationPermitted] = useState(false);
  const [userCurrentCoordinate, setUserCurrentCoordinate] = useState({
    latitude: -5.358125429208756,
    longitude: 105.31483876684943,
  }); // I set the default location to Insitute Technology of Sumatera

  const getUserLocation = () => {
    function onSuccess({ coords }: Position) {
      setUserCurrentCoordinate({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setIsGeolocationPermitted(true);
      setIsGeolocationError(false);
    }

    function onError() {
      console.error("Error getting user location");
      toast.error("Yah... kita gak dapet izin akses lokasi kamu :(", {
        position: "top-center",
        duration: Infinity,
      });
    }

    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    else {
      console.error("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.", {
        position: "top-center",
        duration: Infinity,
      });
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
