import toast from "react-hot-toast";
import { api } from "@/app/_trpc/client";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { tripStore } from "../../lib/store/trip-store";
import { geolocationStore } from "../../lib/store/geolocation-store";
import { useReadLocalStorage } from "usehooks-ts";

export default function useOnProgressTripDetails() {
  const { isLoaded: isUserLoaded, isSignedIn: isUserSignedIn } = useAuth();
  const { userCurrentCoordinate } = geolocationStore(
    ({ userCurrentCoordinate }) => ({
      userCurrentCoordinate,
    }),
  );
  const { setDestination } = tripStore(({ setDestination }) => ({
    setDestination,
  }));
  const publicUserTripDetails = useReadLocalStorage<TripDetails | null>(
    "tiresq.publicUserTripDetails",
  );

  const {
    data: onProgressTripDetails,
    error: onProgressTripDetailsError,
    isError: isErrorFetchingOnProgressTripDetails,
    isFetching: isFetchingOnProgressTripDetails,
    refetch: refetchOnProgressTripDetails,
  } = api.trips.getOnProgressTripDetails.useQuery(
    { userCurrentCoordinate },
    { enabled: isUserLoaded && isUserSignedIn },
  );

  useEffect(() => {
    if (isErrorFetchingOnProgressTripDetails)
      toast.error(onProgressTripDetailsError.message);
  }, [isErrorFetchingOnProgressTripDetails, onProgressTripDetailsError]);

  useEffect(() => {
    if (isUserLoaded && !isUserSignedIn) setDestination(publicUserTripDetails);
    else setDestination(onProgressTripDetails);
  }, [
    isUserLoaded,
    isUserSignedIn,
    setDestination,
    publicUserTripDetails,
    onProgressTripDetails,
  ]);

  return { refetchOnProgressTripDetails, isFetchingOnProgressTripDetails };
}
