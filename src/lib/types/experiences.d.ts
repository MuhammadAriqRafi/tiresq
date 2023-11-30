type UseExperienceParams = { historyId: number };
type ExperiencePageProps = Readonly<{ params: { historyId: string } }>;
type ExperienceHeaderProps = Readonly<{
  isFetchingExperience: boolean;
  destinationName?: string | null;
  createdAt?: Date | null;
}>;

type ExperienceRatingProps = Readonly<{
  userRating: number;
  setUserRating: (rating: number) => void;
  isFetchingExperience: boolean;
}>;

type ExperienceReviewProps = Readonly<{
  userReview: string;
  setUserReview: (review: string) => void;
}>;
