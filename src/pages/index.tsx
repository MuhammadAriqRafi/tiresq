import Head from "next/head";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { api } from "@/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>TiresQ</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {user ? (
          <>
            <p className="text-white">
              Hello! {user.firstName} {user.lastName}
            </p>
            <SignOutButton>
              <button className="mt-4 rounded-md bg-white px-4 py-1">
                Logout
              </button>
            </SignOutButton>
          </>
        ) : (
          <p>Hello World!</p>
        )}
      </main>
    </>
  );
}