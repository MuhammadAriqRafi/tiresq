import Head from "next/head";
import Navbar from "@/components/navbar";
import useHistory from "@/lib/hooks/useHistory";
import FilterGroup from "@/components/histories/filter-group";
import HistoryItem from "@/components/histories/history-item";
import HistoriesLoading from "@/components/loadings/histories-loading";
import { type RouterOutputs } from "@/utils/api";
import { historyStore } from "@/lib/store/history-store";
type History = RouterOutputs["trips"]["index"][number];

const HistoryGroup = () => {
  const { isError, isLoading } = useHistory();
  const { histories, filterStatusBy } = historyStore(
    ({ histories, filterStatusBy }) => ({ histories, filterStatusBy })
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
      {histories.map(({ id, status }: History) => {
        if (filterStatusBy === "none")
          return <HistoryItem key={id} historyId={id} />;
        if (filterStatusBy === status)
          return <HistoryItem key={id} historyId={id} />;
      })}
    </main>
  );
};

export default function Histories() {
  return (
    <>
      <Head>
        <title>Riwayat | TiresQ</title>
      </Head>

      <header className="fixed z-10 w-full bg-white p-6 pb-3 shadow">
        <h1 className="text-heading mb-6">Riwayat</h1>
        <FilterGroup />
      </header>

      <HistoryGroup />

      <Navbar />
    </>
  );
}
