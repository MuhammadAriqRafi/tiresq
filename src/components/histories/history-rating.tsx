import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ChevronRight, Star } from "lucide-react";
import { type HistoryItemProps } from "./history-item";

dayjs.extend(relativeTime);

interface RatingProps extends HistoryItemProps {}
type RatedProps = Pick<RatingProps, "star" | "review">;

const Rated = ({ star, review }: RatedProps) => {
  return (
    <section className="flex w-full items-center justify-between rounded border-2 border-gray-200 p-4">
      <div className="mr-4 flex items-center gap-1 border-r border-r-gray-200 py-1 pr-4">
        <p className="text-subheading">{star}</p>
        <Star size={14} className="fill-yellow-300 stroke-yellow-600" />
      </div>

      <div className="mr-auto flex flex-col gap-y-1 overflow-hidden">
        <p className={`text ${review === null ? "text-red-600" : null}`}>
          {review !== null ? "Ulasanmu" : "Belum ada ulasan"}
        </p>
        <p className="text-label w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {review ?? "Bagaimana pelayanan tambal bannya?"}
        </p>
      </div>

      <ChevronRight size={20} className="ml-2" />
    </section>
  );
};

const Unrated = () => {
  return (
    <section className="flex w-full items-center justify-between rounded border-2 border-gray-200 p-4">
      <p className="text">Berikan rating</p>
      <div className="flex justify-between gap-3">
        {Array.from({ length: 5 }, (_, index) => index + 1).map(
          (value: number) => (
            <Star
              size={18}
              key={`star-${value}`}
              className="fill-slate-300 stroke-slate-300"
            />
          )
        )}
      </div>
    </section>
  );
};

export default function Rating({
  star,
  status,
  review,
  historyId,
  created_at,
  destination,
}: RatingProps) {
  return (
    <>
      {review !== null ? (
        <Sheet>
          <SheetTrigger asChild>
            <section className="w-full">
              <Rated star={star} review={review} />
            </section>
          </SheetTrigger>

          <SheetContent className="flex flex-col gap-8" side="bottom">
            <SheetHeader>
              <div className="flex w-full gap-4">
                <div className="relative h-20 w-20">
                  <Image
                    src="/assets/default.svg"
                    alt="Foto Gerai Tambal Ban"
                    style={{ objectFit: "cover", borderRadius: 4 }}
                    sizes="80px"
                    fill
                  />
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <p className="text">{destination}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-label">
                      {dayjs(created_at).format("D MMM, HH:mm")}
                    </p>
                    <Separator orientation="vertical" />
                    <Badge
                      variant="outline"
                      className="border-green-300 text-green-500"
                    >
                      {status}
                    </Badge>
                  </div>
                </div>
              </div>
            </SheetHeader>

            <div className="flex flex-col">
              <p className="text-label">Ulasanmu</p>
              <p className="text">{review}</p>
            </div>

            <SheetFooter className="w-full">
              <SheetClose asChild>
                <Button className="w-full">Tutup</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Link href={`histories/${historyId}/rating`}>
          {star === null ? <Unrated /> : <Rated star={star} review={null} />}
        </Link>
      )}
    </>
  );
}
