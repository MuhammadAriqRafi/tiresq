import { Badge } from "@/components/ui/badge";
import Rating from "./rating";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import type { RouterOutputs } from "@/utils/api";

type History = RouterOutputs["trips"]["getTrip"][number];

export default function HistoryItem({ history }: { history: History }) {
  const { status } = history;

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
          <h2 className="text-subheading">Tambal ban john</h2>
          <p className="text-label">8 Apr, 20:10</p>
        </div>
        <span className="ml-auto">
          <Badge variant="secondary">{status}</Badge>
        </span>
      </div>

      {status === "completed" ? (
        <>
          <Separator className="my-4" />
          <Rating history={history} />
        </>
      ) : null}
    </article>
  );
}
