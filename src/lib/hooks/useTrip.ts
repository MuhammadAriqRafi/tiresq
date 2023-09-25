import useGeolocation from "./useGeolocation";
import { api } from "@/app/_trpc/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { tripStore } from "../store/trip-store";
import { useCallback, useEffect } from "react";
import { type ClosestTambalBan } from "@/server/api/services/trip-service";

export default function useTrip() {
  const router = useRouter();

  const { userCurrentCoordinate } = useGeolocation();
  const {
    findNearestTambalBanRoute,
    isOnTrip,
    isFetchingTrip,
    isErrorFetchingTrip,
    setIsOnTrip,
    setDestination,
    setIsFetchingTrip,
    setIsErrorFetchingTrip,
    setFindNearestTambalBanRoute,
  } = tripStore(
    ({
      findNearestTambalBanRoute,
      isOnTrip,
      isFetchingTrip,
      isErrorFetchingTrip,
      setIsOnTrip,
      setDestination,
      setIsFetchingTrip,
      setIsErrorFetchingTrip,
      setFindNearestTambalBanRoute,
    }) => ({
      findNearestTambalBanRoute,
      isOnTrip,
      isFetchingTrip,
      isErrorFetchingTrip,
      setIsOnTrip,
      setDestination,
      setIsFetchingTrip,
      setIsErrorFetchingTrip,
      setFindNearestTambalBanRoute,
    }),
  );

  const {
    data: onProgressTripRoute,
    error: onProgressTripRouteError,
    isError: isErrorFetchingOnProgressTripRoute,
    isFetching: isFetchingOnProgressTripRoute,
    isSuccess: isSuccessFetchingOnProgressTripRoute,
  } = api.trips.getOnProgressTripRoute.useQuery(
    {
      userCurrentCoordinate,
    },
    { enabled: isOnTrip && !findNearestTambalBanRoute, retry: 1 },
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

  const { mutate: cancelTrip, isLoading: isCancellingTrip } =
    api.trips.cancelTrip.useMutation({
      onSuccess: () => {
        toast.success("Perjalanan kamu berhasil dibatalin", {
          position: "top-center",
          duration: 5000,
        });
      },
      onSettled: () => {
        setDestination(undefined);
        setIsOnTrip(false);
        void router.refresh();
      },
    });

  const { mutate: completeTrip, isLoading: isCompletingTrip } =
    api.trips.completeTrip.useMutation({
      onSuccess: () => {
        toast.success("Yay!, kamu sudah sampai ditujuan", {
          position: "top-center",
          duration: 5000,
        });
      },
      onSettled: () => {
        setDestination(undefined);
        setIsOnTrip(false);
        void router.refresh();
      },
    });

  const handleOnDataChange = useCallback(
    (data: ClosestTambalBan | undefined) => {
      if (data) setDestination(data);
    },
    [setDestination],
  );

  useEffect(() => {
    setIsFetchingTrip(isFetchingNearestTambalBanRoute);
  }, [isFetchingNearestTambalBanRoute, setIsFetchingTrip]);

  useEffect(() => {
    setIsFetchingTrip(isFetchingOnProgressTripRoute);
  }, [isFetchingOnProgressTripRoute, setIsFetchingTrip]);

  useEffect(() => {
    if (isSuccessFetchingNearestTambalBanRoute && findNearestTambalBanRoute) {
      setIsOnTrip(true);
      setFindNearestTambalBanRoute(false);
      handleOnDataChange(nearestTambalBanRoute);
    }
  }, [
    setIsOnTrip,
    handleOnDataChange,
    nearestTambalBanRoute,
    findNearestTambalBanRoute,
    setFindNearestTambalBanRoute,
    isSuccessFetchingNearestTambalBanRoute,
  ]);

  useEffect(() => {
    if (isSuccessFetchingOnProgressTripRoute && isOnTrip)
      handleOnDataChange(onProgressTripRoute);
  }, [
    isOnTrip,
    handleOnDataChange,
    onProgressTripRoute,
    isSuccessFetchingOnProgressTripRoute,
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
        duration: Infinity,
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

  return {
    cancelTrip,
    completeTrip,
    isFetchingTrip,
    isCancellingTrip,
    isCompletingTrip,
    isErrorFetchingTrip,
  };
}
