import { toast } from "react-hot-toast";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { geolocationStore } from "../../lib/store/geolocation-store";

export default function useGeolocation() {
  const {
    userCurrentCoordinate,
    isGeolocationPermitted,
    setUserCurrentCoordinate,
    setIsGeolocationPermitted,
  } = geolocationStore(
    ({
      userCurrentCoordinate,
      isGeolocationPermitted,
      setUserCurrentCoordinate,
      setIsGeolocationPermitted,
    }) => ({
      userCurrentCoordinate,
      isGeolocationPermitted,
      setIsGeolocationPermitted,
      setUserCurrentCoordinate,
    }),
  );
  const [isGeolocationError, setIsGeolocationError] = useState<
    boolean | undefined
  >();

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
      console.error("Error getting user location");
      toast.error("Yah... kita gak dapet izin akses lokasi kamu :(", {
        position: "top-center",
      });
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

  useEffectOnce(() => getUserLocation());

  return {
    userCurrentCoordinate,
    setUserCurrentCoordinate,
    isGeolocationPermitted,
    isGeolocationError,
  };
}
