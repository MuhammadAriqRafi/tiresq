import { prisma } from "@/server/db";

export const getHistories = async ({ currentUserId }: GetHistoriesProps) => {
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
    take: 10,
  });
};

export const getHistory = async ({ historyId }: GetHistoryProps) => {
  return await prisma.trip.findFirst({
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
