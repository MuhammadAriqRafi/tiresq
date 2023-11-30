type GetHistoryProps = { historyId: number };
type GetHistoriesProps = { currentUserId: string };
type RatingFeedback = { text: string; color: string };
type RatingProps = HistoryItemProps;
type RatedProps = Pick<HistoryItemProps, "star" | "review">;
type HistoriesFilterItemProps = Readonly<{ title: string }>;
type HistoriesItemImage = Readonly<{ rating: number | null }>;
type HistoryItemProps = Readonly<{
  status: string;
  historyId: number;
  created_at: Date;
  destination: string;
  review: string | null;
  rating: number | null;
  star: number | null;
}>;
