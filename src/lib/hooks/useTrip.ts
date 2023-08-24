import { useEffect } from "react";
import { tripStore } from "../store/trip-store";
import { toast } from "react-hot-toast";
import { api } from "@/utils/api";
import { type LatLng } from "./useGeolocation";

export default function useTrip(userCurrentCoordinate: LatLng) {
  const [destination, isOnTrip, setDestination, setIsOnTrip] = tripStore(
    ({ destination, isOnTrip, setIsOnTrip, setDestination }) => [
      destination,
      isOnTrip,
      setDestination,
      setIsOnTrip,
    ]
  );

  const {
    data,
    isFetching: isFetchingDestination,
    isError: isErrorFetchingDestination,
    error: destinationError,
  } = api.trips.findNearestTambalBan.useQuery(
    {
      currentLocation: {
        latitude: userCurrentCoordinate.latitude,
        longitude: userCurrentCoordinate.longitude,
      },
    },
    { enabled: isOnTrip }
  );

  const {
    mutate: cancelTrip,
    isLoading: isCancelling,
    isSuccess: isCancellingSuccess,
  } = api.trips.cancelTrip.useMutation();

  useEffect(() => {
    const handleOnDataChange = () => setDestination(data!);
    if (isOnTrip && data) handleOnDataChange();
  }, [data, isOnTrip, setDestination]);

  useEffect(() => {
    if (isCancellingSuccess)
      toast.success("Perjalanan kamu berhasil dibatalin", {
        position: "top-center",
        duration: 5000,
      });
  }, [isCancellingSuccess]);

  return {
    data,
    cancelTrip,
    destination,
    destinationError,
    setIsOnTrip,
    setDestination,
    isOnTrip,
    isCancelling,
    isFetchingDestination,
    isErrorFetchingDestination,
  };
}
