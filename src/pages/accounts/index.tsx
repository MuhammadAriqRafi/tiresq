import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function Accounts() {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Akun | TiresQ</title>
      </Head>

      <main className="flex h-screen justify-center p-6">
        <div className="w-full">
          <div className="flex h-fit w-full items-center justify-between">
            {user ? (
              <div className="flex items-center gap-3">
                <Image
                  src={user.profileImageUrl}
                  alt={`${user.firstName} ${user.lastName}'s profile image`}
                  height={48}
                  width={48}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="text">{user.fullName}</p>
                  <p className="text-label">
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
            ) : null}
            <SignOutButton>
              <Button size="icon" variant="outline" className="border-red-300">
                <LogOut size={16} />
              </Button>
            </SignOutButton>
          </div>

          <Separator className="mt-4" />

          <Navbar />
        </div>
      </main>
    </>
  );
}
