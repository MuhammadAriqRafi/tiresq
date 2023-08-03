import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Accounts() {
  const { user } = useUser();

  return (
    <main className="flex h-screen justify-center p-6">
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
            <p>{user.fullName}</p>
          </div>
        ) : null}
        <SignOutButton>
          <Button size="sm">Logout</Button>
        </SignOutButton>
        <Navbar />
      </div>
    </main>
  );
}
