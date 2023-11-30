import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Fragment } from "react";
import { statusColor, statusTranslated } from "@/lib/utils/utils";

// Components
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Rating from "./histories-item-rating";
import HistoriesItemImage from "./histories-item-image";

dayjs.extend(relativeTime);

export default function HistoryItem({
  status,
  historyId,
  created_at,
  destination,
  review,
  rating,
  star,
}: HistoryItemProps) {
  const page = (
    <article className="mb-3 bg-white px-6 py-3 shadow-md">
      <div className="flex gap-4">
        <HistoriesItemImage rating={rating} />
        <div className="flex flex-col gap-y-1">
          <h2>{destination}</h2>
          <span>{dayjs(created_at).format("D MMM, HH:mm")}</span>
        </div>
        <div className="ml-auto">
          <Badge
            variant="secondary"
            className={`px-3 py-1 ${statusColor.get(status)}`}
          >
            <p className="badge-text">{statusTranslated.get(status)}</p>
          </Badge>
        </div>
      </div>

      {status === "completed" ? (
        <Fragment>
          <Separator className="my-4" />
          <Rating
            status={status}
            historyId={historyId}
            created_at={created_at}
            destination={destination}
            review={review}
            rating={rating}
            star={star}
          />
        </Fragment>
      ) : null}
    </article>
  );

  return status === "onprogress" ? <Link href="/">{page}</Link> : page;
}
