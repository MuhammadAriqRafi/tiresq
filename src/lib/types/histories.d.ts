type GetHistoryProps = { historyId: number };
type GetHistoriesProps = { currentUserId: string };
type RatingFeedback = { text: string; color: string };
type RatingProps = HistoryItemProps;
type RatedProps = Pick<HistoryItemProps, "trip_rating" | "trip_review">;
type HistoriesFilterItemProps = Readonly<{ title: string }>;
type HistoriesItemImage = Readonly<{ destination_rating: number | null }>;
type HistoryItemProps = Readonly<{
  status: string;
  historyId: number;
  created_at: Date;
  trip_review: string | null;
  trip_rating: number | null;
  destination_name: string;
  destination_rating: number | null;
}>;
