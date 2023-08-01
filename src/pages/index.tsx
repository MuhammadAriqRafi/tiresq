import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="flex h-screen items-center justify-center">
      {user ? (
        <div className="flex flex-col items-center gap-3">
          <Image
            src={user.profileImageUrl}
            alt={`${user.firstName} ${user.lastName}'s profile image`}
            height={48}
            width={48}
            className="rounded-full"
          />
          <p>
            Hello! {user.firstName} {user.lastName}
          </p>
        </div>
      ) : (
        <p>Hello World!</p>
      )}
      <Navbar />
    </main>
  );
}
