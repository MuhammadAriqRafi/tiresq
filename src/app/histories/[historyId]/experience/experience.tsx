"use client";

import dayjs from "dayjs";
import toast from "react-hot-toast";
import relativeTime from "dayjs/plugin/relativeTime";
import useExperience from "@/lib/hooks/useExperience";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";

// Components
import Stars from "./experience-stars";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

dayjs.extend(relativeTime);

type ExperienceProps = {
  historyId: number;
  created_at: Date;
  destination: string;
  star: number | null;
};
export type RatingFeedback = { text: string; color: string };

export default function Experience({
  historyId,
  destination,
  created_at,
  star,
}: ExperienceProps) {
  const router = useRouter();
  const mainContainerHeight = "h-[calc(100vh-124px)]";

  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number | null>(star);
  const { createExperience, isCreatingExperience } = useExperience();
  const [ratingFeedback, setRatingFeedback] = useState<RatingFeedback>({
    text: "",
    color: "",
  });

  const handleReviewInput = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setReview(event.target.value);

  const handleCreateExperience = () => {
    if (rating === null) return toast.error("Kasih bintang dulu ya");
    createExperience({ rating, review, historyId });
  };

  return (
    <>
      <header className="mb-14 flex items-center gap-4 p-6 pb-0">
        <X className="cursor-pointer" onClick={() => router.back()} />
        <div className="flex flex-col gap-1">
          <h2>{destination}</h2>
          <span>{dayjs(created_at).format("dddd, D MMM YYYY, HH:mm")}</span>
        </div>
      </header>

      <main
        className={`${mainContainerHeight} flex flex-col items-stretch px-6`}
      >
        <section className="flex flex-col items-center gap-5">
          <p className="text-subheading">Bagaimana pelayanannya?</p>
          <Stars
            amount={rating}
            onAmountChange={setRating}
            setRatingFeedback={setRatingFeedback}
          />
          <p className={ratingFeedback.color}>{ratingFeedback.text}</p>
        </section>

        <Separator className="my-8" />

        <section className="flex flex-col items-center gap-5">
          <p className="text text-center">
            Apa yang bisa ditingkatin? tulis masukanmu
          </p>
          <Textarea
            placeholder="Masukkan kamu..."
            className="min-h-[100px]"
            maxLength={1000}
            onChange={handleReviewInput}
            value={review}
          />
          <div className="flex w-full justify-between">
            <span>{review.length}/1000</span>
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

        <Button
          onClick={() => handleCreateExperience()}
          className="mb-10 mt-auto"
        >
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
