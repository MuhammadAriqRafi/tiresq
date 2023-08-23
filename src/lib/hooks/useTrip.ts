import { useEffect } from "react";
import { tripStore } from "../store/trip-store";
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

  useEffect(() => {
    const handleOnDataChange = () => setDestination(data!);
    if (isOnTrip && data) handleOnDataChange();
  }, [data, isOnTrip, setDestination]);

  return {
    data,
    isOnTrip,
    setIsOnTrip,
    setDestination,
    destination,
    destinationError,
    isFetchingDestination,
    isErrorFetchingDestination,
  };
}
