import { z } from "zod";
import { prisma } from "@/server/db";
import { publicProcedure, router } from "../trpc";
import { getHistory, getHistories } from "../services/histories-service";

const currentUserId = "user_2TEYMQ96bJgvNNki3rQPQQzKV9t";

const indexInputSchema = z.object({ historyId: z.string() }).nullable();
const index = publicProcedure.input(indexInputSchema).query(({ input }) => {
  if (input !== null) return getHistory({ prisma, historyId: input.historyId });
  return getHistories({ prisma, currentUserId });
});

export const historiesRouter = router({ index });
