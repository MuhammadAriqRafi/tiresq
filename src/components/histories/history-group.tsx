import useHistory from "@/lib/hooks/useHistory";
import HistoryItem from "@/components/histories/history-item";
import HistoriesLoading from "@/components/loadings/histories-loading";
import { historyStore } from "@/lib/store/history-store";
import { type RouterOutputs } from "@/utils/api";

type History = RouterOutputs["trips"]["index"][number];

export default function HistoryGroup() {
  const { histories, isError, isLoading } = useHistory();
  const { filterHistoryStatusBy } = historyStore(
    ({ filterHistoryStatusBy }) => ({
      filterHistoryStatusBy,
    })
  );

  if (isLoading) return <HistoriesLoading />;
  if (isError)
    return (
      <main className="flex h-screen w-screen items-center justify-center">
        <h1>Something went wrong</h1>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-50 pb-14 pt-[132px]">
      {histories!.map(
        ({
          id,
          status,
          rating,
          review,
          created_at,
          destination: { name },
        }: History) => {
          if (filterHistoryStatusBy === "none")
            return (
              <HistoryItem
                key={id}
                star={rating !== null ? rating.star : rating}
                review={review !== null ? review.review : review}
                status={status}
                historyId={id}
                destination={name}
                created_at={created_at}
              />
            );
          if (filterHistoryStatusBy === status)
            return (
              <HistoryItem
                key={id}
                star={rating !== null ? rating.star : rating}
                review={review !== null ? review.review : review}
                status={status}
                historyId={id}
                destination={name}
                created_at={created_at}
              />
            );
        }
      )}
    </main>
  );
}
