import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

export default function Accounts() {
  return (
    <main className="flex h-screen items-center justify-center">
      <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton>
      <Navbar />
    </main>
  );
}
