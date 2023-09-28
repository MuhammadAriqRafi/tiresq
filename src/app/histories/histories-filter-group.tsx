"use client";

import { type TripStatus } from "@prisma/client";

// Components
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { historyStore } from "@/lib/store/histories-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { statusTranslated } from "@/lib/utils/utils";

export default function FilterGroup() {
  const activeStyle = "border border-slate-300 text-white bg-green-600";
  const [filterHistoryStatusBy, setFilterStatusBy] = historyStore(
    ({ filterHistoryStatusBy, setFilterStatusBy }) => [
      filterHistoryStatusBy,
      setFilterStatusBy,
    ],
  );

  return (
    <div className="flex gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className={`${
              filterHistoryStatusBy !== "none" ? activeStyle : null
            } flex justify-between gap-1 font-medium`}
          >
            {statusTranslated.get(filterHistoryStatusBy) ?? "Status"}
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
            value={filterHistoryStatusBy}
            onValueChange={(value: TripStatus) => setFilterStatusBy(value)}
          >
            <Label
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-gray-200 pb-3 text-base"
              htmlFor="completed"
            >
              <p>Selesai</p>
              <RadioGroupItem value="completed" id="completed" />
            </Label>
            <Label
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-gray-200 pb-3 text-base"
              htmlFor="onprogress"
            >
              <p>Aktif</p>
              <RadioGroupItem value="onprogress" id="onprogress" />
            </Label>
            <Label
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-gray-200 pb-3 text-base"
              htmlFor="cancelled"
            >
              <p>Batal</p>
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
