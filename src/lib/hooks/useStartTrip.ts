import toast from "react-hot-toast";
import useGeolocation from "./useGeolocation";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { tripStore } from "../store/trip-store";
import { useUser } from "@clerk/nextjs";
import { api } from "@/app/_trpc/client";
import { type ClosestTambalBan } from "@/server/api/services/trip-service";

export default function useStartTrip() {
  const { isSignedIn: isUserSignedIn } = useUser();
  const [_, setPublicUserDestination] =
    useLocalStorage<ClosestTambalBan | null>(
      "tiresq.publicUserDestination",
      null,
    );

  const { userCurrentCoordinate } = useGeolocation();
  const {
    setIsOnTrip,
    setDestination,
    setIsFetchingTrip,
    setIsErrorFetchingTrip,
    setFindNearestTambalBanRoute,
    findNearestTambalBanRoute,
  } = tripStore(
    ({
      setIsOnTrip,
      setDestination,
      setIsFetchingTrip,
      setIsErrorFetchingTrip,
      setFindNearestTambalBanRoute,
      findNearestTambalBanRoute,
    }) => ({
      setIsOnTrip,
      setDestination,
      setIsFetchingTrip,
      setIsErrorFetchingTrip,
      setFindNearestTambalBanRoute,
      findNearestTambalBanRoute,
    }),
  );

  const {
    data: nearestTambalBanRoute,
    error: nearestTambalBanRouteError,
    isError: isErrorFetchingNearestTambalBanRoute,
    isFetching: isFetchingNearestTambalBanRoute,
    isSuccess: isSuccessFetchingNearestTambalBanRoute,
  } = api.trips.findNearestTambalBanRoute.useQuery(
    { userCurrentCoordinate },
    { enabled: findNearestTambalBanRoute },
  );

  const handleOnDataChange = useCallback(
    (data: ClosestTambalBan | undefined) => {
      if (data) setDestination(data);
    },
    [setDestination],
  );

  useEffect(
    () => setIsFetchingTrip(isFetchingNearestTambalBanRoute),
    [isFetchingNearestTambalBanRoute, setIsFetchingTrip],
  );

  useEffect(() => {
    if (isSuccessFetchingNearestTambalBanRoute && findNearestTambalBanRoute) {
      if (!isUserSignedIn) setPublicUserDestination(nearestTambalBanRoute);
      handleOnDataChange(nearestTambalBanRoute);
      setIsOnTrip(true);
      setFindNearestTambalBanRoute(false);
    }
  }, [
    setIsOnTrip,
    isUserSignedIn,
    handleOnDataChange,
    nearestTambalBanRoute,
    setPublicUserDestination,
    findNearestTambalBanRoute,
    setFindNearestTambalBanRoute,
    isSuccessFetchingNearestTambalBanRoute,
  ]);

  useEffect(() => {
    setIsErrorFetchingTrip(isErrorFetchingNearestTambalBanRoute);

    if (
      isErrorFetchingNearestTambalBanRoute &&
      nearestTambalBanRouteError !== null
    ) {
      setIsOnTrip(false);
      setFindNearestTambalBanRoute(false);

      toast.error(nearestTambalBanRouteError.message, {
        position: "top-center",
      });
    }
  }, [
    setIsOnTrip,
    setIsErrorFetchingTrip,
    nearestTambalBanRouteError,
    setFindNearestTambalBanRoute,
    isErrorFetchingNearestTambalBanRoute,
  ]);

  return null;
}
