import FilterGroup from "./histories-filter-group";
import { serverClient } from "../_trpc/server";

// Components
import HistoryGroup from "./histories-group";

export default async function Histories() {
  const histories = await serverClient.histories.index(null);

  return (
    <>
      <header className="fixed z-10 w-full max-w-screen-md bg-white p-6 pb-3 shadow">
        <h1 className="mb-6">Riwayat</h1>
        <FilterGroup />
      </header>

      <HistoryGroup histories={histories} />
    </>
  );
}
