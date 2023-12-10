import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { tripStore } from "@/lib/store/trip-store";
import { createTrip } from "../_actions/create-trip";
import { useTransition } from "react";
import { useLocalStorage } from "usehooks-ts";
import { type OnProgressTripOutputType } from "../_actions/get-on-progress-trip";

export default function useFindNearestTireRepairShop({
  userCurrentCoordinate,
}: UseFindNearestTireRepairShopParams) {
  const { isSignedIn: isUserSignedIn } = useAuth();
  const [setTrip] = tripStore(({ setTrip }) => [setTrip]);

  const [_, setPublicUserTrip] = useLocalStorage<
    OnProgressTripOutputType["data"]
  >("tiresq.publicUserTrip", null);
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
    isFindingNearestTireRepairShop,
    handleFindNearestTireRepairShop,
  };
}
