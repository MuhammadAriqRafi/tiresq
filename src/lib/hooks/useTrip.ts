import useGeolocation from "./useGeolocation";
import { api } from "@/app/_trpc/client";
import { toast } from "react-hot-toast";
import { tripStore } from "../store/trip-store";
import { useCallback, useEffect } from "react";
import { type ClosestTambalBan } from "@/server/api/services/trip-service";

export default function useTrip(isOnTrip = false) {
  const apiUtils = api.useContext();

  const { userCurrentCoordinate } = useGeolocation();
  const {
    setIsOnTrip,
    isFetchingTrip,
    findNearestTambalBanRoute,
    isErrorFetchingTrip,
    setDestination,
    setIsFetchingTrip,
    setIsErrorFetchingTrip,
    setFindNearestTambalBanRoute,
  } = tripStore(
    ({
      isOnTrip,
      destination,
      findNearestTambalBanRoute,
      isFetchingTrip,
      isErrorFetchingTrip,
      setIsOnTrip,
      setDestination,
      setIsFetchingTrip,
      setIsErrorFetchingTrip,
      setFindNearestTambalBanRoute,
    }) => ({
      isOnTrip,
      destination,
      findNearestTambalBanRoute,
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
    { enabled: isOnTrip ?? false },
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
        setIsOnTrip(false);
        setDestination(undefined);
        setIsOnTrip(false);
        void apiUtils.trips.getOnProgressTripRoute.invalidate();
        void apiUtils.trips.getOnProgressTripRoute.cancel();
        void apiUtils.trips.findNearestTambalBanRoute.invalidate();
        void apiUtils.trips.findNearestTambalBanRoute.cancel();
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
        setIsOnTrip(false);
        setDestination(undefined);
        setIsOnTrip(false);
        void apiUtils.trips.getOnProgressTripRoute.invalidate();
        void apiUtils.trips.getOnProgressTripRoute.cancel();
        void apiUtils.trips.findNearestTambalBanRoute.invalidate();
        void apiUtils.trips.findNearestTambalBanRoute.cancel();
      },
    });

  const handleOnDataChange = useCallback(
    (data: ClosestTambalBan | undefined) => {
      if (data) setDestination(data);
    },
    [setDestination],
  );

  useEffect(() => setIsOnTrip(isOnTrip), [setIsOnTrip, isOnTrip]);

  useEffect(() => {
    setIsFetchingTrip(isFetchingNearestTambalBanRoute);
  }, [isFetchingNearestTambalBanRoute, setIsFetchingTrip]);

  useEffect(() => {
    setIsFetchingTrip(isFetchingOnProgressTripRoute);
  }, [isFetchingOnProgressTripRoute, setIsFetchingTrip]);

  useEffect(() => {
    if (isSuccessFetchingNearestTambalBanRoute) {
      handleOnDataChange(nearestTambalBanRoute);
      setIsOnTrip(true);
      setFindNearestTambalBanRoute(false);
    }
  }, [
    setIsOnTrip,
    setFindNearestTambalBanRoute,
    nearestTambalBanRoute,
    isSuccessFetchingNearestTambalBanRoute,
    handleOnDataChange,
  ]);

  useEffect(() => {
    if (isSuccessFetchingOnProgressTripRoute) {
      handleOnDataChange(onProgressTripRoute);
      setIsOnTrip(true);
    }
  }, [
    setIsOnTrip,
    onProgressTripRoute,
    isSuccessFetchingOnProgressTripRoute,
    handleOnDataChange,
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
    setFindNearestTambalBanRoute,
    isErrorFetchingNearestTambalBanRoute,
    nearestTambalBanRouteError,
    setIsErrorFetchingTrip,
  ]);

  useEffect(() => {
    setIsErrorFetchingTrip(isErrorFetchingOnProgressTripRoute);

    if (
      isErrorFetchingOnProgressTripRoute &&
      onProgressTripRouteError !== null
    ) {
      setIsOnTrip(false);
      toast.error(onProgressTripRouteError.message, {
        duration: Infinity,
        position: "top-center",
      });
    }
  }, [
    setIsOnTrip,
    isErrorFetchingOnProgressTripRoute,
    onProgressTripRouteError,
    setIsErrorFetchingTrip,
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
