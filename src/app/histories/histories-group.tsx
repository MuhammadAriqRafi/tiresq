"use client";

import HistoryItem from "./histories-item";
import { RouterOutputs } from "../_trpc/client";
import { historyStore } from "@/lib/store/histories-store";

type HistoriesGroupProps = { histories: RouterOutputs["histories"]["index"] };

export default function HistoryGroup({ histories }: HistoriesGroupProps) {
  const { filterHistoryStatusBy } = historyStore(
    ({ filterHistoryStatusBy }) => ({
      filterHistoryStatusBy,
    }),
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-14 pt-[132px]">
      {histories.map(
        ({ id, status, created_at, rating, review, destination: { name } }) => {
          if (
            filterHistoryStatusBy !== status &&
            filterHistoryStatusBy !== "none"
          )
            return;

          return (
            <HistoryItem
              key={id}
              status={status}
              historyId={id}
              destination={name}
              created_at={created_at}
              review={review !== null ? review.review : review}
              star={rating !== null ? rating.star : rating}
            />
          );
        },
      )}
    </main>
  );
}
