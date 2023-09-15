import dayjs from "dayjs";
import Stars from "@/components/ui/stars";
import superjson from "superjson";
import useHistory from "@/lib/hooks/useHistory";
import relativeTime from "dayjs/plugin/relativeTime";
import useExperience from "@/lib/hooks/useExperience";
import { Label } from "@/components/ui/label";
import { prisma } from "@/server/db";
import { Button } from "@/components/ui/button";
import { getAuth } from "@clerk/nextjs/server";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { appRouter } from "@/server/api/root";
import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import { Loader2, X } from "lucide-react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { type ChangeEvent, useState, useEffect } from "react";

dayjs.extend(relativeTime);

export type RatingFeedback = { text: string; color: string };

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userId } = getAuth(context.req);
  const historyId = Number(context.params?.historyId);

  console.log({ typeofwindow: typeof window }, "Server");

  const helpers = createServerSideHelpers({
    router: appRouter,
    transformer: superjson,
    ctx: { prisma, currentUserId: userId },
  });

  await helpers.trips.index.prefetch({ historyId });

  return {
    props: {
      historyId,
      trpcState: helpers.dehydrate(),
    },
  };
}

export default function Ratings({
  historyId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log({ typeofwindow: typeof window }, "Client");

  const router = useRouter();
  const headerHeight = "h-[calc(100vh-124px)]";

  const { histories, isLoading, isError } = useHistory({ historyId });
  const { mutate, isLoading: isCreatingExperience } = useExperience();

  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [ratingFeedback, setRatingFeedback] = useState<RatingFeedback>({
    text: "",
    color: "",
  });

  const handleOnSubmit = () => mutate({ tripId: historyId, rating, review });
  const handleReviewInput = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setReview(event.target.value);

  useEffect(() => {
    if (histories) setRating(histories[0]?.rating?.star ?? null);
  }, [histories, setRating]);

  if (isError || isLoading) return <h1>Something went wrong</h1>;

  const { destination, created_at } = histories![0]!;

  return (
    <>
      <header className="mb-14 flex items-center gap-4 p-6 pb-0">
        <X className="cursor-pointer" onClick={router.back} />
        <div className="flex flex-col gap-1">
          <h1 className="text-subheading">{destination.name}</h1>
          <p className="text-label">
            {dayjs(created_at).format("dddd, D MMM YYYY, HH:mm")}
          </p>
        </div>
      </header>

      <main className={`flex ${headerHeight} flex-col items-stretch px-6`}>
        <section className="flex flex-col items-center gap-6">
          <h2 className="text-subheading">Bagaimana pelayanannya?</h2>
          <Stars
            amount={rating}
            onAmountChange={setRating}
            setRatingFeedback={setRatingFeedback}
          />
          <span className={`text-subheading ${ratingFeedback.color}`}>
            {ratingFeedback.text}
          </span>
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
            maxLength={1000}
          />
          <div className="flex w-full justify-between">
            <p className="text-label">{review.length}/1000</p>
            <div className="flex items-center gap-2">
              <Checkbox id="anonymous" />
              <Label
                htmlFor="anonymous"
                className="cursor-pointer text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sembunyikan nama
              </Label>
            </div>
          </div>
        </section>

        <Button className="mb-10 mt-auto" onClick={handleOnSubmit}>
          {isCreatingExperience ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            "Kirim"
          )}
        </Button>
      </main>
    </>
  );
}
