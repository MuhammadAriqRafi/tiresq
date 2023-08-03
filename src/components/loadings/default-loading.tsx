import { Loader2 } from "lucide-react";

export default function DefaultLoading() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Loader2 className="animate-spin" size={56} color="#EAEAEA" />
    </main>
  );
}
