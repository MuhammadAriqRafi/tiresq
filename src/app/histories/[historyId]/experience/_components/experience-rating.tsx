import { Star } from "lucide-react";
import { ratingFeedback } from "@/lib/utils/utils";
import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExperienceRating({
  userRating,
  setUserRating,
  isFetchingExperience,
}: ExperienceRatingProps) {
  const handleOnClick = (starIndex: number) => setUserRating(starIndex);

  return (
    <section className="flex flex-col items-center gap-5">
      <p className="text-subheading">Bagaimana pelayanannya?</p>

      {!isFetchingExperience ? (
        <Fragment>
          <div className="flex cursor-pointer justify-between gap-3">
            {Array.from({ length: 5 }, (_, index) => index + 1).map(
              (starIndex: number) => (
                <Star
                  size={28}
                  className={`${
                    starIndex <= userRating
                      ? "fill-yellow-300 stroke-yellow-600"
                      : "fill-slate-300 stroke-slate-300"
                  }`}
                  onClick={() => handleOnClick(starIndex)}
                  key={`star-${starIndex}`}
                />
              ),
            )}
          </div>
          <p className={ratingFeedback.get(userRating)?.color}>
            {ratingFeedback.get(userRating)?.text}
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <Skeleton className="h-7 w-44 rounded-lg bg-zinc-200" />
          <Skeleton className="h-5 w-32 rounded-md bg-zinc-200" />
        </Fragment>
      )}
    </section>
  );
}
