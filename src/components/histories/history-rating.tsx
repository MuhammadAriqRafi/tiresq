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
import { type RouterOutputs } from "@/utils/api";
import { ChevronRight, Star } from "lucide-react";
import { historyStore } from "@/lib/store/history-store";

dayjs.extend(relativeTime);

type RatingProps = { historyId: number };
type RatedProps = { star: number; review: string | null };
type History = RouterOutputs["trips"]["index"][number];

const Rated = ({ star, review }: RatedProps) => {
  return (
    <section className="flex items-center justify-between rounded border-2 border-gray-200 p-4">
      <div className="mr-6 flex items-center gap-2 border-r border-r-gray-200 py-1 pr-4">
        <p className="text">{star}</p>
        <Star size={16} />
      </div>

      <div className="mr-auto flex flex-col gap-y-1">
        <p className={`text ${review === null ? "text-red-500" : null}`}>
          {review !== null ? "Ulasanmu" : "Belum ada ulasan"}
        </p>
        <p className="text-label">
          {review ?? "Bagaimana pelayanan tambal bannya?"}
        </p>
      </div>

      <ChevronRight size={20} />
    </section>
  );
};

const Unrated = () => {
  return (
    <section className="flex items-center justify-between rounded border-2 border-gray-200 p-4">
      <p className="text">Berikan rating</p>
      <div className="flex justify-between gap-3">
        {Array.from({ length: 5 }, (_, index) => index + 1).map(
          (value: number) => (
            <Star size={16} key={`star-${value}`} />
          )
        )}
      </div>
    </section>
  );
};

export default function Rating({ historyId }: RatingProps) {
  const { created_at, destination, review, rating } = historyStore(
    (state) => state.histories
  ).find((history) => history.id === historyId) as unknown as History;

  return (
    <>
      {review?.review !== null ? (
        <Sheet>
          <SheetTrigger asChild>
            <section>
              <Rated star={rating!.star!} review={review!.review} />
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
                  <p className="text">{destination.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-label">
                      {dayjs(created_at).format("D MMM, HH:mm")}
                    </p>
                    <Separator orientation="vertical" />
                    <Badge
                      variant="outline"
                      className="border-green-300 text-green-500"
                    >
                      Completed
                    </Badge>
                  </div>
                </div>
              </div>
            </SheetHeader>

            <div className="flex flex-col">
              <p className="text-label">Ulasanmu</p>
              <p className="text">{review!.review}</p>
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
          {rating!.star === null ? (
            <Unrated />
          ) : (
            <Rated star={rating!.star} review={null} />
          )}
        </Link>
      )}
    </>
  );
}
