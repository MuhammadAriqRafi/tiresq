"use client";

import useTrip from "@/lib/hooks/useTrip";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { tripStore } from "@/lib/store/trip-store";
import { Footprints, Hourglass } from "lucide-react";

// Components
import { Sheet } from "@/components/ui/sheet";
import CancelTripSheet, { CancelTripSheetTrigger } from "./cancel-trip-sheet";
import CompleteTripSheet, {
  CompleteTripSheetTrigger,
} from "./finish-trip-sheet";

const ActiveTrip = () => {
  const [isTripWillBeCompleted, setIsTripWillBeCompleted] = useState<boolean>();
  const { cancelTrip, completeTrip, isCancellingTrip, isCompletingTrip } =
    useTrip();
  const { destination, isOnTrip } = tripStore(({ destination, isOnTrip }) => ({
    destination,
    isOnTrip,
  }));

  const handleCancelTrip = () => cancelTrip();
  const handleCompleteTrip = () => completeTrip();

  return (
    <>
      {isOnTrip && destination && (!isCancellingTrip || !isCompletingTrip) ? (
        <section className="border-b-1 absolute top-0 flex h-fit w-screen max-w-screen-md items-center justify-between rounded-b-2xl border-b-gray-300 bg-white px-6 py-4 shadow-md">
          <section className="flex flex-col gap-3">
            <h2>{destination.name ?? "Unknown"}</h2>
            <div className="flex gap-3">
              <span className="flex gap-1 font-medium text-gray-500">
                <Footprints size={16} /> {destination.distance ?? 0} Km
              </span>
              <span className="flex gap-1 font-medium text-gray-500">
                <Hourglass size={16} /> {destination.duration ?? 0} Min
              </span>
            </div>
          </section>
          <Separator orientation="vertical" className="bg-border h-9 w-[1px]" />
          <section className="flex gap-2">
            <Sheet>
              <CancelTripSheetTrigger
                onClick={() => {
                  toast.dismiss();
                  setIsTripWillBeCompleted(false);
                }}
              />

              <CompleteTripSheetTrigger
                onClick={() => {
                  toast.dismiss();
                  setIsTripWillBeCompleted(true);
                }}
              />

              {isTripWillBeCompleted ? (
                <CompleteTripSheet onComplete={handleCompleteTrip} />
              ) : (
                <CancelTripSheet onCancel={handleCancelTrip} />
              )}
            </Sheet>
          </section>
        </section>
      ) : null}
    </>
  );
};

export default ActiveTrip;
