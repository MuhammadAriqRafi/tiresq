import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Fragment } from "react";
import { ChevronRight, Star } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/utils/utils";

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

dayjs.extend(relativeTime);

const Rated = ({ star, review }: RatedProps) => {
  return (
    <section className="flex w-full items-center justify-between rounded border-2 border-gray-200 p-4">
      <div className="mr-4 flex items-center gap-1 border-r border-r-gray-200 py-1 pr-4">
        <h2 className="text-subheading">{star}</h2>
        <Star size={14} className="fill-yellow-300 stroke-yellow-600" />
      </div>

      <div className="mr-auto flex flex-col gap-y-1 overflow-hidden">
        <span className={`${review ?? "text-red-600"} font-semibold`}>
          {review !== null ? "Ulasanmu" : "Belum ada ulasan"}
        </span>
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {review ?? "Bagaimana pelayanan tambal bannya?"}
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
  star,
  status,
  review,
  historyId,
  created_at,
  destination,
}: RatingProps) {
  return (
    <Fragment>
      {review !== null ? (
        <Sheet>
          <SheetTrigger asChild>
            <section className="w-full">
              <Rated star={star} review={review} />
            </section>
          </SheetTrigger>

          <SheetContent className="flex flex-col gap-6" side="bottom">
            <SheetHeader>
              <div className="flex w-full gap-4">
                <div className="relative h-20 w-20">
                  <Image
                    src="/assets/default.svg"
                    alt="Foto Gerai Tambal Ban"
                    className="rounded-md object-cover"
                    sizes="80px"
                    fill
                  />
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <p className="text">{destination}</p>
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
              <p>{review}</p>
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
          {star === null ? <Unrated /> : <Rated star={star} review={null} />}
        </Link>
      )}
    </Fragment>
  );
}
