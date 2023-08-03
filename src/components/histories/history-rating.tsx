import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";

export type RatingProps = {
  historyId: number;
  isExpired: boolean;
  star?: number;
  review?: string;
};

export default function Rating({
  isExpired,
  star,
  review,
  historyId,
}: RatingProps) {
  return (
    <Link
      className={!isExpired ? "cursor-pointer" : "cursor-default"}
      href={!isExpired ? `histories/${historyId}/rating` : "/histories"}
    >
      <div className="flex items-center justify-between rounded border-2 border-gray-200 p-4">
        {!star ? (
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
              <p className="text">{star}</p>
              <Star size={16} />
            </div>
            <div className="mr-auto flex flex-col gap-y-1">
              <p className="text">{review ? "Ulasanmu" : "Belum ada ulasan"}</p>
              <p className="text-label">
                {review ? review : "Bagaimana pelayanan tambal bannya?"}
              </p>
            </div>
            <ChevronRight size={20} />
          </>
        )}
      </div>
    </Link>
  );
}
