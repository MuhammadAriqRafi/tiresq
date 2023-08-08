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

type Props = { historyId: number };
type Rated = { star: number; review?: string };
type History = RouterOutputs["trips"]["getTrip"][number];

const Rated = ({ star, review }: Rated) => {
  return (
    <>
      <div className="mr-6 flex items-center gap-2 border-r border-r-gray-200 py-1 pr-4">
        <p className="text">{star}</p>
        <Star size={16} />
      </div>

      <div className="mr-auto flex flex-col gap-y-1">
        <p className={`text ${!review ? "text-red-500" : null}`}>
          {review ? "Ulasanmu" : "Belum ada ulasan"}
        </p>
        <p className="text-label">
          {review ? review : "Bagaimana pelayanan tambal bannya?"}
        </p>
      </div>

      <ChevronRight size={20} />
    </>
  );
};

const Unrated = () => {
  return (
    <>
      <p className="text">Berikan rating</p>
      <div className="flex justify-between gap-3">
        {[...(Array(5).fill(1) as number[])].map((_value, index) => (
          <Star size={16} key={index} />
        ))}
      </div>
    </>
  );
};

export default function Rating({ historyId }: Props) {
  const { created_at, tambal_ban, review, rating } = historyStore(
    (state) => state.histories
  ).find((history) => history.id === historyId) as unknown as History;

  return (
    <>
      {review !== null ? (
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center justify-between rounded border-2 border-gray-200 p-4">
              {!rating?.star ? (
                <Unrated />
              ) : (
                <Rated star={rating?.star} review={review.review!} />
              )}
            </div>
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
                  <p className="text">{tambal_ban.name}</p>
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
              <p className="text">{review.review}</p>
            </div>

            <SheetFooter className="w-full">
              <SheetClose asChild>
                <Button className="w-full">Tutup</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Link
          href={`histories/${historyId}/rating`}
          className="flex items-center justify-between rounded border-2 border-gray-200 p-4"
        >
          {!rating?.star ? (
            <Unrated />
          ) : (
            <Rated star={rating?.star} review={undefined} />
          )}
        </Link>
      )}
    </>
  );
}
