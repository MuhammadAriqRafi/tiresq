"use client";

import HistoryItem from "./histories-item";
import { historyStore } from "@/lib/store/histories-store";
import { api, type RouterOutputs } from "../_trpc/client";

type HistoriesGroupProps = { histories: RouterOutputs["histories"]["index"] };

export default function HistoryGroup({ histories }: HistoriesGroupProps) {
  const { data: historiesFromClientFetch } = api.histories.index.useQuery(
    null,
    {
      initialData: histories,
    },
  );

  const { filterHistoryStatusBy } = historyStore(
    ({ filterHistoryStatusBy }) => ({
      filterHistoryStatusBy,
    }),
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-14 pt-[132px]">
      {historiesFromClientFetch.map(
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
