import Head from "next/head";
import Navbar from "@/components/navbar";
import { UserProfile } from "@clerk/nextjs";

export default function Accounts() {
  return (
    <>
      <Head>
        <title>Akun | TiresQ</title>
      </Head>

      <main className="mx-auto mb-28 w-fit md:mb-24">
        <UserProfile />
      </main>

      <Navbar />
    </>
  );
}
