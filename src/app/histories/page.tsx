import { auth } from "@clerk/nextjs";
import { cache } from "react";
import { prisma } from "@/server/db";
import { getHistories } from "@/server/api/services/histories-service";

// Components
import FilterGroup from "./histories-filter-group";
import HistoryGroup from "./histories-group";

export default async function Histories() {
  const { userId: currentUserId } = auth();
  if (currentUserId === null) return <p>Not Authorized</p>;

  const cachedHistories = cache(
    async () => await getHistories({ prisma, currentUserId }),
  );
  const histories = await cachedHistories();

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
