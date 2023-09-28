"use client";

import HistoryItem from "./histories-item";
import { historyStore } from "@/lib/store/histories-store";
import { api, type RouterOutputs } from "../_trpc/client";

export type HistoriesGroupProps = {
  histories: RouterOutputs["histories"]["getHistories"];
};

export default function HistoryGroup({ histories }: HistoriesGroupProps) {
  const { data: historiesFromClientFetch } =
    api.histories.getHistories.useQuery(undefined, {
      initialData: histories,
    });

  const { filterHistoryStatusBy } = historyStore(
    ({ filterHistoryStatusBy }) => ({
      filterHistoryStatusBy,
    }),
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-[76px] pt-[132px]">
      {historiesFromClientFetch.length > 0 ? (
        historiesFromClientFetch.map(
          ({
            id,
            status,
            rating,
            review,
            created_at,
            destination: { name },
          }) => {
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
        )
      ) : (
        <div className="flex h-[60vh] w-screen items-center justify-center">
          <h2>Belum ada riwayat</h2>
        </div>
      )}
    </main>
  );
}
