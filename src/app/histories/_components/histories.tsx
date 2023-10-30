"use client";

import { api } from "../../_trpc/client";
import { historyStore } from "@/lib/store/histories-store";

import HistoryItem from "./histories-item";
import HistoriesLoading from "./histories-loading";

export default function Histories() {
  const {
    isError,
    isLoading,
    data: histories,
  } = api.histories.getHistories.useQuery();

  const { filterHistoriesByStatus } = historyStore(
    ({ filterHistoriesByStatus }) => ({
      filterHistoriesByStatus,
    }),
  );

  if (isError) return <p>Something went wrong</p>;

  return (
    <main className="min-h-screen bg-gray-50 pb-[76px] pt-[132px]">
      {isLoading ? <HistoriesLoading /> : null}

      {!isLoading && histories.length > 0
        ? histories.map(
            ({
              id,
              status,
              rating,
              review,
              created_at,
              destination: { name },
            }) => {
              if (
                filterHistoriesByStatus !== status &&
                filterHistoriesByStatus !== "none"
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
        : null}

      {!isLoading && histories.length < 1 ? (
        <div className="flex h-[60vh] w-screen items-center justify-center">
          <h2>Belum ada riwayat</h2>
        </div>
      ) : null}
    </main>
  );
}
