import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { tripStore } from "@/lib/store/trip-store";
import { useState, useTransition } from "react";
import { cancelTrip as cancelTripService } from "../_actions/cancel-trip";
import { completeTrip as completeTripService } from "../_actions/complete-trip";

export default function useOnProgressTripActions() {
  const [isCancellingTrip, cancelTrip] = useTransition();
  const [isCompletingTrip, completeTrip] = useTransition();
  const [isTripWillBeCompleted, setIsTripWillBeCompleted] = useState<boolean>();
  const { isSignedIn: isUserSignedIn } = useAuth();
  const [trip, setTrip] = tripStore(({ trip, setTrip }) => [trip, setTrip]);

  function removePublicUserTripFromLocalStorage() {
    localStorage.removeItem("tiresq.publicUserTrip");
    setTrip(null);
  }

  function handleCompleteTrip() {
    if (!isUserSignedIn) {
      removePublicUserTripFromLocalStorage();
      toast.success("Yay, kamu sudah sampai ditujuan");
      return;
    }

    if (trip !== null)
      completeTrip(async () => {
        const { status, message } = await completeTripService(trip.id);

        if (status !== 200) toast.error(message);
        else {
          setTrip(null);
          toast.success(message);
        }
      });
  }

  function handleCancelTrip() {
    if (!isUserSignedIn) {
      removePublicUserTripFromLocalStorage();
      toast.success("Berhasil batalin perjalanan");
      return;
    }

    if (trip !== null)
      cancelTrip(async () => {
        const { status, message } = await cancelTripService(trip.id);

        if (status !== 200) toast.error(message);
        else {
          setTrip(null);
          toast.success(message);
        }
      });
  }

  return {
    isCancellingTrip,
    isCompletingTrip,
    handleCancelTrip,
    handleCompleteTrip,
    isTripWillBeCompleted,
    setIsTripWillBeCompleted,
  };
}
