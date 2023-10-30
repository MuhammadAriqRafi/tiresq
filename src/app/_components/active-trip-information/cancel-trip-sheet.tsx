import {
  SheetClose,
  SheetTitle,
  SheetHeader,
  SheetFooter,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CancelTripSheetTrigger({
  onClick,
  isCancelling,
}: {
  readonly onClick: () => void;
  readonly isCancelling: boolean;
}) {
  return (
    <SheetTrigger asChild>
      <Button
        size="sm"
        variant="outline"
        className="border-red-500 text-red-500"
        onClick={onClick}
      >
        {isCancelling ? (
          <Loader2 className="stroke-red-50- animate-spin" />
        ) : (
          "Batalin"
        )}
      </Button>
    </SheetTrigger>
  );
}

export default function CancelTripSheet({
  onCancel,
}: {
  onCancel: () => void;
}) {
  return (
    <SheetContent className="flex flex-col gap-8" side="bottom">
      <SheetHeader>
        <SheetTitle className="text-left text-lg font-semibold">
          Yakin mau batalin perjalanan ?
        </SheetTitle>
      </SheetHeader>

      <SheetFooter className="flex w-full flex-row gap-3">
        <SheetClose asChild>
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-grow border-red-500 text-red-500"
          >
            Yakin
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button className="flex-grow">Tidak</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
