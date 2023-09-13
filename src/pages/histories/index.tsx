import Head from "next/head";
import Navbar from "@/components/navbar";
import superjson from "superjson";
import FilterGroup from "@/components/histories/filter-group";
import HistoryGroup from "@/components/histories/history-group";
import { prisma } from "@/server/db";
import { getAuth } from "@clerk/nextjs/server";
import { appRouter } from "@/server/api/root";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext } from "next";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userId } = getAuth(context.req);

  const helpers = createServerSideHelpers({
    router: appRouter,
    transformer: superjson,
    ctx: { prisma, currentUser: userId },
  });

  await helpers.trips.index.prefetch(null);

  return {
    props: { trpcState: helpers.dehydrate() },
  };
}
