import { toast } from "react-hot-toast";
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

  useEffectOnce(() => {
    function onSuccess({ coords: { longitude, latitude } }: Position) {
      setIsGeolocationPermitted(true);
      setUserCurrentCoordinate({ latitude, longitude });
    }

    function onError() {
      console.error("Error getting user location");
      toast.error("Yah... kita gak dapet izin akses lokasi kamu :(", {
        position: "top-center",
      });
    }

    let watchId = 0;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        maximumAge: 5000,
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast.error(
        "Yah, fitur geolokasi gak disupport di browser ini, coba pakai browser lain",
        {
          position: "top-center",
        },
      );
    }

    return () => navigator.geolocation.clearWatch(watchId);
  });

  return {
    userCurrentCoordinate,
    isGeolocationPermitted,
  };
}
