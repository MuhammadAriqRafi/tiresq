import Rating from "./history-rating";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

dayjs.extend(relativeTime);

export interface HistoryItemProps {
  status: string;
  historyId: number;
  created_at: Date;
  destination: string;
  review: string | null;
  star: number | null;
}

export default function HistoryItem({
  status,
  historyId,
  created_at,
  destination,
  review,
  star,
}: HistoryItemProps) {
  const statusColor: Map<string, string> = new Map();
  const statusTranslated: Map<string, string> = new Map();
  statusColor.set("completed", "bg-green-300");
  statusColor.set("cancelled", "bg-red-300");
  statusColor.set("onprogress", "bg-yellow-300");
  statusTranslated.set("completed", "Selesai");
  statusTranslated.set("cancelled", "Batal");
  statusTranslated.set("onprogress", "Aktif");

  const page = (
    <article className="mb-3 bg-white px-6 py-3 shadow-md">
      <div className="flex gap-4">
        <div className="relative h-16 w-16">
          <Image
            src="/assets/default.svg"
            alt="Foto Gerai Tambal Ban"
            style={{ objectFit: "cover", borderRadius: 4 }}
            sizes="80px"
            fill
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <h2 className="text-subheading">{destination}</h2>
          <p className="text-label">
            {dayjs(created_at).format("D MMM, HH:mm")}
          </p>
        </div>
        <span className="ml-auto">
          <Badge
            variant="secondary"
            className={`px-3 py-1 ${statusColor.get(status)}`}
          >
            {statusTranslated.get(status)}
          </Badge>
        </span>
      </div>

      {status === "completed" ? (
        <>
          <Separator className="my-4" />
          <Rating
            status={status}
            historyId={historyId}
            created_at={created_at}
            destination={destination}
            review={review}
            star={star}
          />
        </>
      ) : null}
    </article>
  );

  return status === "onprogress" ? <Link href="/">{page}</Link> : page;
}
