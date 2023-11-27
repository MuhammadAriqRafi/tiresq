"use client";

import useOnProgressTripActions from "@/app/_hooks/use-on-progress-trip-actions";
import { Footprints, Hourglass } from "lucide-react";
import { tripStore } from "@/lib/store/trip-store";
import { Fragment } from "react";
import { toast } from "react-hot-toast";

// Components
import { Sheet } from "@/components/ui/sheet";
import CancelTripSheet, { CancelTripSheetTrigger } from "./cancel-trip-sheet";
import CompleteTripSheet, {
  CompleteTripSheetTrigger,
} from "./complete-trip-sheet";

export default function OnProgressTripDetails() {
  const {
    isCancellingTrip,
    isCompletingTrip,
    handleCancelTrip,
    handleCompleteTrip,
    isTripWillBeCompleted,
    setIsTripWillBeCompleted,
  } = useOnProgressTripActions();
  const { trip } = tripStore(({ trip }) => ({ trip }));

  return (
    <Fragment>
      {trip !== null ? (
        <section className="border-b-1 absolute top-0 flex h-fit w-screen max-w-screen-md items-center justify-between rounded-b-2xl border-b-gray-300 bg-white px-6 py-4 shadow-md">
          <section className="flex flex-col gap-3">
            <h2>{trip.destination.name ?? "Unknown"}</h2>
            <div className="flex gap-3">
              <span className="flex gap-1 font-medium text-gray-500">
                <Footprints size={16} /> {trip.detail?.distance ?? 0} Km
              </span>
              <span className="flex gap-1 font-medium text-gray-500">
                <Hourglass size={16} /> {trip.detail?.duration ?? 0} Min
              </span>
            </div>
          </section>

          <Sheet>
            <section className="flex gap-2">
              <CancelTripSheetTrigger
                isCancelling={isCancellingTrip}
                onClick={() => {
                  toast.dismiss();
                  setIsTripWillBeCompleted(false);
                }}
              />

              <CompleteTripSheetTrigger
                isCompleting={isCompletingTrip}
                onClick={() => {
                  toast.dismiss();
                  setIsTripWillBeCompleted(true);
                }}
              />
            </section>

            {isTripWillBeCompleted ? (
              <CompleteTripSheet onComplete={handleCompleteTrip} />
            ) : (
              <CancelTripSheet onCancel={handleCancelTrip} />
            )}
          </Sheet>
        </section>
      ) : null}
    </Fragment>
  );
}
