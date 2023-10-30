import { Fragment } from "react";

// Components
import Histories from "./_components/histories";
import HistoriesFilterGroup from "./_components/histories-filter-group";

export default function HistoriesPage() {
  return (
    <Fragment>
      <header className="fixed z-10 w-full max-w-screen-md bg-white p-6 pb-3 shadow">
        <h1 className="mb-6">Riwayat</h1>
        <HistoriesFilterGroup />
      </header>

      <Histories />
    </Fragment>
  );
}
