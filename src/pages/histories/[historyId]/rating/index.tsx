import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api";
import { Star, X } from "lucide-react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DefaultLoading from "@/components/loadings/default-loading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import type { ChangeEvent } from "react";

dayjs.extend(relativeTime);

export default function Ratings() {
  const router = useRouter();
  const { historyId } = router.query;
  const [review, setReview] = useState("");
  const { data: history, isLoading } = api.trips.index.useQuery({
    historyId: parseInt(historyId as string),
  });

  if (isLoading) return <DefaultLoading />;
  if (!history) return <h1>something went wrong</h1>;

  const headerHeight = "h-[calc(100vh-124px)]";
  const isRated = !!history[0]?.rating?.star;
  const starAmount = isRated ? history[0]?.rating?.star : 5;

  const handleReviewInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (review.length < 1000) setReview(e.target.value);
  };

  return (
    <>
      <header className="mb-14 flex items-center gap-4 p-6 pb-0">
        <X className="cursor-pointer" onClick={router.back} />
        <div className="flex flex-col gap-1">
          <h1 className="text-subheading">{history[0]?.destination.name}</h1>
          <p className="text-label">
            {dayjs(history[0]?.created_at).format("dddd, D MMM YYYY, HH:mm")}
          </p>
        </div>
      </header>

      <main className={`flex ${headerHeight} flex-col items-stretch px-6`}>
        <section className="flex flex-col items-center gap-6">
          <h2 className="text-subheading">Bagaimana pelayanannya?</h2>
          <div className="flex cursor-pointer justify-between gap-3">
            {[...(Array(starAmount).fill(1) as number[])].map(
              (value: number) => (
                <Star
                  size={24}
                  key={value}
                  className={isRated ? "fill-yellow-300" : ""}
                />
              )
            )}
          </div>
          <span className="text-subheading">Memuaskan</span>
        </section>

        <Separator className="my-8" />

        <section className="flex flex-col items-center gap-5">
          <h2 className="text text-center">
            Apa yang bisa ditingkatin? tulis masukanmu
          </h2>
          <Textarea
            placeholder="Masukkan kamu..."
            onChange={handleReviewInput}
            value={review}
          />
          <div className="flex w-full justify-between">
            <p className="text-label">{review.length}/1000</p>
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="cursor-pointer text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sembunyikan nama
              </Label>
            </div>
          </div>
        </section>

        <Button className="mb-10 mt-auto">Kirim</Button>
      </main>
    </>
  );
}
