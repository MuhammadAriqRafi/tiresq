import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Fragment } from "react";
import { ChevronRight, Star } from "lucide-react";
import { capitalizeFirstLetter, cn } from "@/lib/utils/utils";

// Components
import {
  Sheet,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import HistoriesItemImage from "./histories-item-image";

dayjs.extend(relativeTime);

const Rated = ({ trip_rating, trip_review }: RatedProps) => {
  return (
    <section className="flex w-full items-center justify-between rounded border-2 border-gray-200 p-4">
      <div className="mr-4 flex items-center gap-1 border-r border-r-gray-200 py-1 pr-4">
        <h2 className="text-subheading">{trip_rating}</h2>
        <Star size={14} className="fill-yellow-300 stroke-yellow-600" />
      </div>

      <div className="mr-auto flex flex-col gap-y-1 overflow-hidden">
        <span
          className={cn("font-semibold", {
            "text-red-600": trip_review === null,
          })}
        >
          {trip_review !== null ? "Ulasanmu" : "Belum ada ulasan"}
        </span>
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {trip_review ?? "Bagaimana pelayanan tambal bannya?"}
        </span>
      </div>

      <ChevronRight size={20} className="ml-2" />
    </section>
  );
};

const Unrated = () => {
  return (
    <section className="flex w-full items-center justify-between rounded border-2 border-gray-200 p-4">
      <p>Berikan rating</p>
      <div className="flex justify-between gap-3">
        {Array.from({ length: 5 }, (_, index) => index + 1).map(
          (value: number) => (
            <Star
              size={18}
              key={`star-${value}`}
              className="fill-slate-300 stroke-slate-300"
            />
          ),
        )}
      </div>
    </section>
  );
};

export default function Rating({
  status,
  historyId,
  created_at,
  trip_rating,
  trip_review,
  destination_name,
  destination_rating,
}: RatingProps) {
  return (
    <Fragment>
      {trip_review !== null ? (
        <Sheet>
          <SheetTrigger asChild>
            <div className="w-full">
              <Rated trip_rating={trip_rating} trip_review={trip_review} />
            </div>
          </SheetTrigger>

          <SheetContent className="flex flex-col gap-6" side="bottom">
            <SheetHeader>
              <div className="flex w-full gap-4">
                <HistoriesItemImage destination_rating={destination_rating} />
                <div className="flex flex-col gap-2 text-left">
                  <p className="text">{destination_name}</p>
                  <div className="flex items-center gap-3">
                    <span>{dayjs(created_at).format("D MMM, HH:mm")}</span>
                    <Separator orientation="vertical" />
                    <Badge
                      variant="outline"
                      className="border-green-300 text-green-500"
                    >
                      <p className="badge-text">
                        {capitalizeFirstLetter(status)}
                      </p>
                    </Badge>
                  </div>
                </div>
              </div>
            </SheetHeader>

            <div className="flex flex-col gap-1 rounded-md border border-slate-200 p-4">
              <span>Ulasanmu</span>
              <p>{trip_review}</p>
            </div>

            <SheetFooter className="w-full">
              <SheetClose asChild>
                <Button className="w-full">Tutup</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Link href={`histories/${historyId}/experience`}>
          {trip_rating === null ? (
            <Unrated />
          ) : (
            <Rated trip_rating={trip_rating} trip_review={null} />
          )}
        </Link>
      )}
    </Fragment>
  );
}
