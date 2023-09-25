import { type Prisma } from "@/server/db";

type GetHistoryProps = { prisma: Prisma; historyId: string };
type GetHistoriesProps = { prisma: Prisma; currentUserId: string };

export const getHistories = async ({
  prisma,
  currentUserId,
}: GetHistoriesProps) => {
  return await prisma.trip.findMany({
    where: { user_id: currentUserId },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      status: true,
      created_at: true,
      destination: { select: { name: true } },
      rating: { select: { star: true } },
      review: { select: { review: true } },
    },
  });
};

export const getHistory = async ({ prisma, historyId }: GetHistoryProps) => {
  return await prisma.trip.findMany({
    where: { id: Number(historyId) },
    select: {
      id: true,
      status: true,
      created_at: true,
      destination: { select: { name: true } },
      rating: { select: { star: true } },
      review: { select: { review: true } },
    },
  });
};
