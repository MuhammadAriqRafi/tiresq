import Experience from "./experience";
import NotFound from "@/app/not-found";
import { prisma } from "@/server/db";
import { getHistory } from "@/server/api/services/histories-service";

export default async function ExperiencePage({
  params: { historyId },
}: {
  params: { historyId: string };
}) {
  const history = await getHistory({ prisma, historyId });
  if (history === null) return <NotFound />;
  const { id, rating, destination, created_at } = history;

  return (
    <Experience
      star={rating !== null ? rating.star : rating}
      destination={destination.name}
      created_at={created_at}
      historyId={id}
    />
  );
}
