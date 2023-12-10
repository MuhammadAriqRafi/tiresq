import { Star } from "lucide-react";
import Image from "next/image";

export default function HistoriesItemImage({
  destination_rating,
}: HistoriesItemImage) {
  return (
    <div className="relative mb-2 h-20 w-20">
      <Image
        src="/assets/default.svg"
        alt="Foto Gerai Tambal Ban"
        className="rounded-md object-cover"
        fill
      />
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/4 items-center gap-1 rounded-full bg-white px-2 py-1 shadow-md">
        <Star size={16} className="fill-yellow-300 stroke-yellow-600" />
        <span className="font-bold">{destination_rating ?? "N/A"}</span>
      </div>
    </div>
  );
}
