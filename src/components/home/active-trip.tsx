import { Sheet } from "@/components/ui/sheet";
import { memo, useState } from "react";
import { Footprints, Hourglass } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { toast } from "react-hot-toast";
import CancelTripSheet, { CancelTripSheetTrigger } from "./cancel-trip-sheet";
import CompleteTripSheet, {
  CompleteTripSheetTrigger,
} from "./finish-trip-sheet";

type Trip = {
  distance?: number;
  duration?: number;
  tambalBanName?: string;
  onCancel: () => void;
  onComplete: () => void;
};

const ActiveTrip = ({
  distance,
  duration,
  onCancel,
  onComplete,
  tambalBanName,
}: Trip) => {
  const [isTripWillBeCompleted, setIsTripWillBeCompleted] = useState<
    boolean | undefined
  >();

  return (
    <section className="border-b-1 absolute top-0 flex h-fit w-screen max-w-screen-md items-center justify-between rounded-b-2xl border-b-gray-300 bg-white px-6 py-4 shadow-md">
      <section className="flex flex-col gap-3">
        <h1 className="text-subheading">{tambalBanName ?? "Unknown"}</h1>
        <div className="flex gap-3">
          <p className="text-label flex gap-1 font-medium text-gray-500">
            <Footprints size={16} /> {distance ?? 0} Km
          </p>
          <p className="text-label flex gap-1 font-medium text-gray-500">
            <Hourglass size={16} /> {duration ?? 0} Min
          </p>
        </div>
      </section>
      <Separator orientation="vertical" className="h-9 w-[1px] bg-border" />
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
            <CompleteTripSheet onComplete={onComplete} />
          ) : (
            <CancelTripSheet onCancel={onCancel} />
          )}
        </Sheet>
      </section>
    </section>
  );
};

export default memo(ActiveTrip);
