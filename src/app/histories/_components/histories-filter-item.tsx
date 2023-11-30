"use client";

import { ChevronDown } from "lucide-react";
import { historiesStore } from "@/lib/store/histories-store";
import { cn, statusTranslated } from "@/lib/utils/utils";
import { type TripStatus } from "@prisma/client";

// Components
import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const radioItems = [
  { title: "Selesai", value: "completed" },
  { title: "Aktif", value: "onprogress" },
  { title: "Batal", value: "cancelled" },
];

export default function HistoriesFilterItem({
  title,
}: HistoriesFilterItemProps) {
  const { filterHistoriesByStatus, setFilterHistoriesByStatus } =
    historiesStore(
      ({ filterHistoriesByStatus, setFilterHistoriesByStatus }) => ({
        setFilterHistoriesByStatus,
        filterHistoriesByStatus,
      }),
    );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={cn("flex justify-between gap-1 font-semibold", {
            "border border-slate-300 bg-green-600 text-white":
              filterHistoriesByStatus,
          })}
        >
          {statusTranslated.get(filterHistoriesByStatus ?? "") ?? title}
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
          value={filterHistoriesByStatus}
          onValueChange={(value: TripStatus) =>
            setFilterHistoriesByStatus(value)
          }
        >
          {radioItems.map(({ title, value }) => (
            <Label
              key={value}
              htmlFor={value}
              className="flex w-full cursor-pointer items-center justify-between border-b border-b-gray-200 pb-3 text-base"
            >
              <p>{title}</p>
              <RadioGroupItem value={value} id={value} />
            </Label>
          ))}
        </RadioGroup>

        <SheetFooter className="flex flex-row justify-between gap-4">
          <Button
            className="w-1/2"
            variant="outline"
            onClick={() => setFilterHistoriesByStatus(undefined)}
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
  );
}
