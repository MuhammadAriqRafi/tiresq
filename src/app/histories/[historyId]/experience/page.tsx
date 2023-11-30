"use client";

import useExperience from "./_hooks/useExperience";
import { Loader2 } from "lucide-react";
import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ExperienceHeader from "./_components/experience-header";
import ExperienceRating from "./_components/experience-rating";
import ExperienceReview from "./_components/experience-review";

export default function ExperiencePage({
  params: { historyId },
}: ExperiencePageProps) {
  const {
    experience,
    userRating,
    userReview,
    setUserRating,
    setUserReview,
    isFetchingExperience,
    isCreatingExperience,
    isErrorFetchingExperience,
    handleCreateExperience,
  } = useExperience({ historyId: +historyId });

  if (isErrorFetchingExperience) return <p>Internal Server Error</p>;

  return (
    <Fragment>
      <ExperienceHeader
        createdAt={experience ? experience?.created_at : null}
        destinationName={experience ? experience?.destination.name : null}
        isFetchingExperience={isFetchingExperience}
      />
      <main className="flex h-[calc(100vh-124px)] flex-col items-stretch px-6">
        <ExperienceRating
          userRating={userRating}
          setUserRating={setUserRating}
          isFetchingExperience={isFetchingExperience}
        />
        <Separator className="my-8" />
        <ExperienceReview
          userReview={userReview}
          setUserReview={setUserReview}
        />

        <Button
          onClick={() => handleCreateExperience()}
          className="fixed bottom-10 left-1/2 z-10 block w-[calc(100vw-48px)] max-w-screen-md -translate-x-1/2"
        >
          {isCreatingExperience ? (
            <Loader2 size={18} className="mx-auto animate-spin" />
          ) : (
            "Kirim"
          )}
        </Button>
      </main>
    </Fragment>
  );
}
