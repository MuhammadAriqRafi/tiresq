import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { tripStore } from "@/lib/store/trip-store";
import { useState, useTransition } from "react";
import {
  cancelTrip as cancelTripService,
  completeTrip as completeTripService,
} from "@/server/api/services/trip-service";

export default function useActiveTripInformation() {
  const [isCancellingTrip, cancelTrip] = useTransition();
  const [isCompletingTrip, completeTrip] = useTransition();
  const [isTripWillBeCompleted, setIsTripWillBeCompleted] = useState<boolean>();
  const { isSignedIn: isUserSignedIn } = useAuth();
  const { destination, setDestination } = tripStore(
    ({ destination, setDestination }) => ({
      setDestination,
      destination,
    }),
  );

  function removePublicUserTripDetailsFromLocalStorage() {
    localStorage.removeItem("tiresq.publicUserTripDetails");
    setDestination(null);
  }

  function handleCompleteTrip() {
    if (!isUserSignedIn) {
      removePublicUserTripDetailsFromLocalStorage();
      toast.success("Yay, kamu sudah sampai ditujuan");
      return;
    }

    completeTrip(async () => {
      const { isError, message } = await completeTripService(
        destination!.tripId!,
      );

      if (isError) toast.error(message);
      else {
        setDestination(null);
        toast.success(message);
      }
    });
  }

  function handleCancelTrip() {
    if (!isUserSignedIn) {
      removePublicUserTripDetailsFromLocalStorage();
      toast.success("Berhasil batalin perjalanan");
      return;
    }

    cancelTrip(async () => {
      const { isError, message } = await cancelTripService(
        destination!.tripId!,
      );

      if (isError) toast.error(message);
      else {
        setDestination(null);
        toast.success(message);
      }
    });
  }

  return {
    destination,
    handleCancelTrip,
    handleCompleteTrip,
    isCancellingTrip,
    isCompletingTrip,
    isTripWillBeCompleted,
    setIsTripWillBeCompleted,
  };
}
