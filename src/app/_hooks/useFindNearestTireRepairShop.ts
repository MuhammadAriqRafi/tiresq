import toast from "react-hot-toast";
import useOnProgressTripDetails from "@/app/_hooks/useOnProgressTripDetails";
import { useEffect, useTransition } from "react";
import { geolocationStore } from "@/lib/store/geolocation-store";
import { useLocalStorage } from "usehooks-ts";
import { createTrip } from "@/server/api/services/trip-service";
import { tripStore } from "@/lib/store/trip-store";
import { useAuth } from "@clerk/nextjs";

export default function useFindNearestTireRepairShop() {
  const { isSignedIn: isUserSignedIn } = useAuth();
  const { refetchOnProgressTripDetails, isFetchingOnProgressTripDetails } =
    useOnProgressTripDetails();
  const { isGeolocationPermitted, userCurrentCoordinate } = geolocationStore(
    ({ isGeolocationPermitted, userCurrentCoordinate }) => ({
      isGeolocationPermitted,
      userCurrentCoordinate,
    }),
  );
  const { destination, setDestination } = tripStore(
    ({ destination, setDestination }) => ({
      setDestination,
      destination,
    }),
  );
  const [publicUserTripDetails, setPublicUserTripDetails] =
    useLocalStorage<TripDetails | null>("tiresq.publicUserTripDetails", null);
  const [isFindingNearestTireRepairShop, findNearestTireRepairShop] =
    useTransition();

  function handleFindNearestTireRepairShop() {
    findNearestTireRepairShop(async () => {
      const { data, isError, message } = await createTrip({
        userCurrentCoordinate,
      });

      if (isError) toast.error(message);
      else if (!isUserSignedIn) setPublicUserTripDetails(data);
      else void refetchOnProgressTripDetails();
    });
  }

  useEffect(() => {
    if (!isUserSignedIn) setDestination(publicUserTripDetails);
  }, [isUserSignedIn, publicUserTripDetails, setDestination]);

  return {
    destination,
    isGeolocationPermitted,
    isFetchingOnProgressTripDetails,
    isFindingNearestTireRepairShop,
    handleFindNearestTireRepairShop,
  };
}
