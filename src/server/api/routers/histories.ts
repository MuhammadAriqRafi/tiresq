import { prisma } from "@/server/db";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

const currentUserId = "user_2TEYMQ96bJgvNNki3rQPQQzKV9t";

const indexInputSchema = z.object({ historyId: z.string() }).nullable();
const index = publicProcedure.input(indexInputSchema).query(({ input }) => {
  if (input !== null)
    return prisma.trip.findMany({
      where: { id: Number(input.historyId) },
      select: {
        id: true,
        status: true,
        created_at: true,
        destination: { select: { name: true } },
        rating: { select: { star: true } },
        review: { select: { review: true } },
      },
    });
  return prisma.trip.findMany({
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
});

export const historiesRouter = router({ index });
