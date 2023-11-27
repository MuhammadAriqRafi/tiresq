type GetHistoryProps = { historyId: number };
type GetHistoriesProps = { currentUserId: string };
type RatingFeedback = { text: string; color: string };
type RatingProps = HistoryItemProps;
type RatedProps = Pick<HistoryItemProps, "star" | "review">;
type HistoriesFilterItemProps = Readonly<{ title: string }>;
type HistoryItemProps = Readonly<{
  status: string;
  historyId: number;
  created_at: Date;
  destination: string;
  review: string | null;
  star: number | null;
}>;
