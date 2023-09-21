import Rating from "./rating";
import { serverClient } from "@/app/_trpc/server";

export default async function Ratings({
  params: { historyId },
}: {
  params: { historyId: string };
}) {
  const [{ destination, rating, created_at }] =
    await serverClient.histories.index({
      historyId,
    });

  return (
    <Rating
      star={rating !== null ? rating.star : rating}
      destination={destination.name}
      created_at={created_at}
    />
  );
}
