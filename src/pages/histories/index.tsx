import Head from "next/head";
import HistoryList from "./history-list";
import FilterList from "./filter-list";
import Navbar from "@/components/navbar";

export default function Histories() {
  return (
    <>
      <Head>
        <title>TiresQ</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="fixed z-10 w-full bg-white p-6 pb-3 shadow">
        <h1 className="text-heading mb-6">Riwayat</h1>
        <FilterList />
      </header>
      <main>
        <HistoryList />
      </main>

      <Navbar />
    </>
  );
}
