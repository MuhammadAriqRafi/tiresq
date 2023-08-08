import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Footprints, Hourglass, Info } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { toast } from "react-hot-toast";

type ActiveTrip = {
  distance?: number;
  duration?: number;
  tambalBanName?: string;
  onCancel: () => void;
};

const ActiveTrips = ({
  distance,
  duration,
  tambalBanName,
  onCancel,
}: ActiveTrip) => {
  return (
    <section className="border-b-1 absolute top-0 flex h-fit w-screen items-center justify-between rounded-b-2xl border-b-gray-300 bg-white px-6 py-4 shadow-md">
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
          <SheetTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="border-red-500 text-red-500"
              onClick={() => {
                toast.dismiss();
              }}
            >
              Batalin
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-8" side="bottom">
            <SheetHeader>
              <SheetTitle className="text-left text-lg font-semibold">
                Yakin mau batalin perjalanan ?
              </SheetTitle>
            </SheetHeader>

            <SheetFooter className="flex w-full flex-row gap-3">
              <Button
                variant="outline"
                className="flex-grow"
                onClick={onCancel}
              >
                Yakin
              </Button>
              <SheetClose asChild>
                <Button type="submit" className="flex-grow">
                  Tidak
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Button
          size="sm"
          className="bg-green-600"
          onClick={() => {
            toast("Fiturnya masih dalam tahap pengembangan yaa :)", {
              icon: <Info />,
            });
          }}
        >
          Sampai
        </Button>
      </section>
    </section>
  );
};

export default memo(ActiveTrips);
