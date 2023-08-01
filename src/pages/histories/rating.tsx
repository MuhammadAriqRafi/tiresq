import type { RouterOutputs } from "@/utils/api";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";

type History = RouterOutputs["trips"]["getTrip"][number];

export default function Rating({ history }: { history: History }) {
  const { rating, review } = history;

  return (
    <Link
      className={rating !== null ? "cursor-pointer" : "cursor-default"}
      href={rating !== null ? "/ratings" : "/histories"}
    >
      <div className="flex items-center justify-between rounded border-2 border-gray-200 p-4">
        {rating === null ? (
          <>
            <p className="text">Berikan rating</p>
            <div className="flex justify-between gap-3">
              {[...(Array(5).fill(1) as number[])].map((_value, index) => (
                <Star size={16} key={index} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mr-6 flex items-center gap-2 border-r border-r-gray-200 py-1 pr-4">
              <p className="text">5</p>
              <Star size={16} />
            </div>
            <div className="mr-auto flex flex-col gap-y-1">
              <p className="text">
                {review === null ? "Belum ada ulasan" : "Ulasanmu"}
              </p>
              <p className="text-label">
                {review === null
                  ? "Bagaimana pelayanan tambal bannya?"
                  : "Bagusss bangettt, abangnya ramah..."}
              </p>
            </div>
            <ChevronRight size={20} />
          </>
        )}
      </div>
    </Link>
  );
}
