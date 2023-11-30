import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CompleteTripSheetTrigger({
  onClick,
  isCompleting,
}: CompleteTripSheetTrigger) {
  return (
    <SheetTrigger asChild>
      <Button size="sm" className="bg-green-600" onClick={onClick}>
        {isCompleting ? (
          <Loader2 className="stroke-red-50- animate-spin" />
        ) : (
          "Sampai"
        )}
      </Button>
    </SheetTrigger>
  );
}

export default function CompleteTripSheet({
  onComplete,
}: CompleteTripSheetProps) {
  return (
    <SheetContent className="flex flex-col gap-8" side="bottom">
      <SheetHeader>
        <SheetTitle className="text-left text-lg font-semibold">
          Kamu sudah sampai tujuan?
        </SheetTitle>
      </SheetHeader>

      <SheetFooter className="flex w-full flex-row gap-3">
        <SheetClose asChild>
          <Button type="submit" variant="outline" className="flex-grow">
            Belum
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button className="flex-grow bg-green-600" onClick={onComplete}>
            Sudah
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
