import Head from "next/head";
import Navbar from "@/components/navbar";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";
import HistoryItem from "@/components/histories/history-item";
import FilterList from "@/components/histories/filter-list";
import HistoriesLoading from "@/components/loadings/histories-loading";

type Histories = RouterOutputs["trips"]["getTrip"];
type History = RouterOutputs["trips"]["getTrip"][number];

const HistoryList = ({ histories }: { histories: Histories }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-14 pt-[132px]">
      <>
        {histories.map(
          (
            { id, status, created_at, tambal_ban, rating, review }: History,
            index: number
          ) => {
            return (
              <HistoryItem
                key={index}
                created_at={created_at}
                status={status}
                tambal_ban_name={tambal_ban.name}
                rating={{
                  historyId: id,
                  isExpired: false,
                  star: rating?.star ?? undefined,
                  review: review?.review ?? undefined,
                }}
              />
            );
          }
        )}
      </>
    </div>
  );
};

export default function Histories() {
  const { data: histories, isLoading } = api.trips.getTrip.useQuery();

  if (!isLoading && !histories)
    return (
      <main className="flex h-screen w-screen items-center justify-center">
        <h1>Something went wrong</h1>
      </main>
    );

  return (
    <>
      <Head>
        <title>Riwayat | TiresQ</title>
      </Head>

      <header className="fixed z-10 w-full bg-white p-6 pb-3 shadow">
        <h1 className="text-heading mb-6">Riwayat</h1>
        <FilterList />
      </header>

      {isLoading ? (
        <HistoriesLoading />
      ) : (
        <main>
          <HistoryList histories={histories} />
        </main>
      )}

      <Navbar />
    </>
  );
}
