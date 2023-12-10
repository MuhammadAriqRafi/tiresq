import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTransition, useEffect, useState } from "react";

import { api } from "@/app/_trpc/client";
import { createExperience as createExperienceService } from "@/server/api/services/experience-service";

export default function useExperience({ historyId }: UseExperienceParams) {
  const {
    data: experience,
    isError: isErrorFetchingExperience,
    isSuccess: isSuccessFetchingExperience,
    isFetching: isFetchingExperience,
  } = api.experiences.getExperience.useQuery({
    historyId,
  });

  const router = useRouter();
  const [isCreatingExperience, createExperience] = useTransition();
  const [userReview, setUserReview] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);

  function handleCreateExperience() {
    if (userRating === 0) return toast.error("Kasih bintang dulu yaa");

    createExperience(async () => {
      const { status, message } = await createExperienceService({
        historyId: +historyId,
        userRating,
        userReview,
      });

      if (status !== 200) toast.error(message);
      else {
        toast.success(message, {
          position: "bottom-center",
          className: "mb-20",
        });
        router.back();
      }
    });
  }

  useEffect(() => {
    if (isSuccessFetchingExperience && experience)
      setUserRating(experience.experience?.rating ?? 0);
  }, [experience, isSuccessFetchingExperience]);

  return {
    experience,
    userRating,
    userReview,
    setUserReview,
    setUserRating,
    isFetchingExperience,
    isCreatingExperience,
    isErrorFetchingExperience,
    handleCreateExperience,
  };
}
