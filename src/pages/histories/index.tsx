import Head from "next/head";
import Navbar from "@/components/navbar";
import FilterList from "@/components/histories/filter-list";
import HistoryItem from "@/components/histories/history-item";
import HistoriesLoading from "@/components/loadings/histories-loading";
import { api, type RouterOutputs } from "@/utils/api";
import { historyStore } from "@/lib/store/history-store";
import { useEffect } from "react";

type Histories = RouterOutputs["trips"]["getTrip"];
type History = RouterOutputs["trips"]["getTrip"][number];

const HistoryList = ({ histories }: { histories: Histories }) => {
  return (
    <main className="min-h-screen bg-gray-50 pb-14 pt-[132px]">
      {histories.map(({ id }: History, index: number) => {
        return <HistoryItem key={index} historyId={id} />;
      })}
    </main>
  );
};

export default function Histories() {
  const { data, isLoading, isError } = api.trips.getTrip.useQuery(null);
  const setHistories = historyStore((state) => state.setHistories);

  useEffect(() => {
    if (data) setHistories(data);
  }, [data, setHistories]);

  if (isError)
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

      {isLoading ? <HistoriesLoading /> : <HistoryList histories={data} />}

      <Navbar />
    </>
  );
}
