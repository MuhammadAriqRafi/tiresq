"use client";

import { type ChangeEvent } from "react";

// Components
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function ExperienceReview({
  userReview,
  setUserReview,
}: ExperienceReviewProps) {
  const handleReviewInput = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setUserReview(event.target.value);

  return (
    <section className="flex flex-col items-center gap-5">
      <p className="text text-center">
        Apa yang bisa ditingkatin? tulis masukanmu
      </p>
      <Textarea
        value={userReview}
        maxLength={1000}
        placeholder="Masukkan kamu..."
        className="min-h-[100px]"
        onChange={handleReviewInput}
      />
      <div className="flex w-full justify-between">
        <span>{userReview.length}/1000</span>
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
  );
}
