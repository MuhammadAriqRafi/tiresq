import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { tripStore } from "@/lib/store/trip-store";
import { useTransition } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  createTrip,
  type OnProgressTripType,
} from "@/server/api/services/trip-service";

export default function useFindNearestTireRepairShop({
  userCurrentCoordinate,
}: UseFindNearestTireRepairShopParams) {
  const { isSignedIn: isUserSignedIn } = useAuth();
  const { trip, setTrip } = tripStore(({ trip, setTrip }) => ({
    setTrip,
    trip,
  }));

  const [_, setPublicUserTrip] = useLocalStorage<OnProgressTripType["data"]>(
    "tiresq.publicUserTrip",
    null,
  );
  const [isFindingNearestTireRepairShop, findNearestTireRepairShop] =
    useTransition();

  function handleFindNearestTireRepairShop() {
    findNearestTireRepairShop(async () => {
      const { data, status, message } = await createTrip({
        userCurrentCoordinate,
      });

      if (status !== 200) toast.error(message);
      else if (!isUserSignedIn) {
        setPublicUserTrip(data);
        setTrip(data);
      } else setTrip(data);
    });
  }

  return {
    trip,
    isFindingNearestTireRepairShop,
    handleFindNearestTireRepairShop,
  };
}
