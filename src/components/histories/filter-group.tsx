import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { historyStore } from "@/lib/store/history-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type TripStatus } from "@prisma/client";

export default function FilterGroup() {
  const [filterStatusBy, setFilterStatusBy] = historyStore(
    ({ filterStatusBy, setFilterStatusBy }) => [
      filterStatusBy,
      setFilterStatusBy,
    ]
  );

  return (
    <div className="flex gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="flex justify-between gap-1 font-semibold"
          >
            Status
            <ChevronDown size={18} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6" side="bottom">
          <SheetHeader>
            <SheetTitle className="text-start text-xl font-bold">
              Status Riwayat
            </SheetTitle>
          </SheetHeader>
          <RadioGroup
            value={filterStatusBy}
            onValueChange={(value: TripStatus) => setFilterStatusBy(value)}
          >
            <Label
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-gray-200 pb-3 text-base"
              htmlFor="completed"
            >
              <p className="text-subheading font-medium">Completed</p>
              <RadioGroupItem value="completed" id="completed" />
            </Label>
            <Label
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-gray-200 pb-3 text-base"
              htmlFor="onprogress"
            >
              <p className="text-subheading font-medium">Onprogress</p>
              <RadioGroupItem value="onprogress" id="onprogress" />
            </Label>
            <Label
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-gray-200 pb-3 text-base"
              htmlFor="cancelled"
            >
              <p className="text-subheading font-medium">Cancelled</p>
              <RadioGroupItem value="cancelled" id="cancelled" />
            </Label>
          </RadioGroup>
          <SheetFooter className="flex flex-row justify-between gap-4">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={() => setFilterStatusBy("none")}
            >
              Reset
            </Button>
            <SheetClose asChild>
              <Button className="w-1/2" type="submit">
                Terapkan
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
