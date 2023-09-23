import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function CancelTripSheetTrigger({ onClick }: { onClick: () => void }) {
  return (
    <SheetTrigger asChild>
      <Button
        size="sm"
        variant="outline"
        className="border-red-500 text-red-500"
        onClick={onClick}
      >
        Batalin
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
    <>
      <SheetContent className="flex flex-col gap-8" side="bottom">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-semibold">
            Yakin mau batalin perjalanan ?
          </SheetTitle>
        </SheetHeader>

        <SheetFooter className="flex w-full flex-row gap-3">
          <Button
            variant="outline"
            className="flex-grow border-red-500 text-red-500"
            onClick={onCancel}
          >
            Yakin
          </Button>
          <SheetClose asChild>
            <Button className="flex-grow">Tidak</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </>
  );
}
