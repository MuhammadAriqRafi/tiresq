import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Loader2 size={64} className="animate-spin stroke-slate-300" />
    </main>
  );
}
