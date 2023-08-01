import Head from "next/head";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>TiresQ</title>
        <meta
          name="description"
          content="Having a flat tire? TiresQ to the rescue!, TiresQ is a web based nearest tambal ban finder app to ease your life when having flat tire"
        />
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
