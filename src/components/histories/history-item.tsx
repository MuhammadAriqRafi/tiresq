import { Badge } from "@/components/ui/badge";
import Rating, { RatingProps } from "./history-rating";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Props = {
  created_at: Date;
  status: string;
  tambal_ban_name: string;
  rating: RatingProps;
};

export default function HistoryItem({
  status,
  created_at,
  tambal_ban_name,
  rating,
}: Props) {
  const statusColor = new Map();
  statusColor.set("completed", "bg-green-300");
  statusColor.set("cancelled", "bg-red-300");
  statusColor.set("onprogress", "bg-yellow-300");

  return (
    <article className="mb-4 bg-white px-6 py-3 shadow-md">
      <div className="flex gap-4">
        <div className="relative h-16 w-16">
          <Image
            src="/assets/default.svg"
            alt="Foto Gerai Tambal Ban"
            style={{ objectFit: "cover" }}
            sizes="80px"
            fill
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <h2 className="text-subheading">{tambal_ban_name}</h2>
          <p className="text-label">
            {dayjs(created_at).format("D MMM, HH:mm")}
          </p>
        </div>
        <span className="ml-auto">
          <Badge variant="secondary" className={statusColor.get(status)}>
            {status}
          </Badge>
        </span>
      </div>

      {status === "completed" ? (
        <>
          <Separator className="my-4" />
          <Rating {...rating} />
        </>
      ) : null}
    </article>
  );
}
