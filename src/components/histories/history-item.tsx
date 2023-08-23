import Rating from "./history-rating";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { historyStore } from "@/lib/store/history-store";
import { capitalizeFirstLetter } from "@/utils/utils";
import { type RouterOutputs } from "@/utils/api";

dayjs.extend(relativeTime);

type Props = { historyId: number };
type History = RouterOutputs["trips"]["index"][number];

export default function HistoryItem({ historyId }: Props) {
  const history = historyStore((state) => state.histories).find(
    (history) => history.id === historyId
  ) as unknown as History;

  const statusColor: Map<string, string> = new Map();
  statusColor.set("completed", "bg-green-300");
  statusColor.set("cancelled", "bg-red-300");
  statusColor.set("onprogress", "bg-yellow-300");

  if (!history)
    return (
      <article className="mb-4 bg-white px-6 py-3 shadow-md">
        <h1>Something went wrong</h1>
      </article>
    );

  const { status, created_at, destination } = history;

  return (
    <article className="mb-4 bg-white px-6 py-3 shadow-md">
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
          <h2 className="text-subheading">{destination.name}</h2>
          <p className="text-label">
            {dayjs(created_at).format("D MMM, HH:mm")}
          </p>
        </div>
        <span className="ml-auto">
          <Badge variant="secondary" className={statusColor.get(status)}>
            {capitalizeFirstLetter(status)}
          </Badge>
        </span>
      </div>

      {status === "completed" ? (
        <>
          <Separator className="my-4" />
          <Rating historyId={historyId} />
        </>
      ) : null}
    </article>
  );
}
