import useGeolocation from "./useGeolocation";
import { useCallback, useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { tripStore } from "../store/trip-store";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/app/_trpc/client";
import { type ClosestTambalBan } from "@/server/api/services/trip-service";

export default function useOnProgressTrip() {
  const { isLoaded: isUserLoaded, isSignedIn: isUserSignedIn } = useAuth();
  const { userCurrentCoordinate } = useGeolocation();
  const {
    isOnTrip,
    setIsOnTrip,
    setDestination,
    setIsFetchingTrip,
    setIsErrorFetchingTrip,
    findNearestTambalBanRoute,
  } = tripStore(
    ({
      isOnTrip,
      setIsOnTrip,
      setDestination,
      setIsFetchingTrip,
      setIsErrorFetchingTrip,
      findNearestTambalBanRoute,
    }) => ({
      isOnTrip,
      setIsOnTrip,
      setDestination,
      setIsFetchingTrip,
      setIsErrorFetchingTrip,
      findNearestTambalBanRoute,
    }),
  );

  const {
    data: onProgressTripRoute,
    error: onProgressTripRouteError,
    isError: isErrorFetchingOnProgressTripRoute,
    isSuccess: isSuccessLoadingOnProgressTripRoute,
    isFetching: isFetchingOnProgressTripRoute,
  } = api.trips.getOnProgressTripRoute.useQuery(
    {
      userCurrentCoordinate,
    },
    {
      retry: 1,
      enabled:
        isOnTrip &&
        isUserLoaded &&
        isUserSignedIn &&
        !findNearestTambalBanRoute,
    },
  );

  const publicUserDestination = useReadLocalStorage<ClosestTambalBan | null>(
    "tiresq.publicUserDestination",
  );

  const handleOnDataChange = useCallback(
    (data: ClosestTambalBan | undefined) => {
      if (data) setDestination(data);
    },
    [setDestination],
  );

  useEffect(() => {
    if (isUserLoaded && isUserSignedIn && !isSuccessLoadingOnProgressTripRoute)
      setIsOnTrip(true);
  }, [
    setIsOnTrip,
    isUserLoaded,
    isUserSignedIn,
    isSuccessLoadingOnProgressTripRoute,
  ]);

  useEffect(() => {
    if (publicUserDestination !== null) {
      setIsOnTrip(true);
      setDestination(publicUserDestination);
    }
  }, [publicUserDestination, setIsOnTrip, setDestination]);

  useEffect(
    () => setIsFetchingTrip(isFetchingOnProgressTripRoute),
    [isFetchingOnProgressTripRoute, setIsFetchingTrip],
  );

  useEffect(() => {
    if (isSuccessLoadingOnProgressTripRoute && isOnTrip) {
      handleOnDataChange(onProgressTripRoute);
      setIsOnTrip(true);
    }
  }, [
    isOnTrip,
    setIsOnTrip,
    handleOnDataChange,
    onProgressTripRoute,
    isSuccessLoadingOnProgressTripRoute,
  ]);

  useEffect(() => {
    setIsErrorFetchingTrip(isErrorFetchingOnProgressTripRoute);

    if (isErrorFetchingOnProgressTripRoute && onProgressTripRouteError !== null)
      setIsOnTrip(false);
  }, [
    setIsOnTrip,
    setIsErrorFetchingTrip,
    onProgressTripRouteError,
    isErrorFetchingOnProgressTripRoute,
  ]);

  return null;
}
