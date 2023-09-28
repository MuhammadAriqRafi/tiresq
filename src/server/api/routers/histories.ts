import { z } from "zod";
import { prisma } from "@/server/db";
import { privateProcedure, router } from "../trpc";
import {
  getHistory as getHistoryService,
  getHistories as getHistoriesService,
} from "../services/histories-service";

const getHistories = privateProcedure.query(
  async ({ ctx: { currentUserId } }) => {
    return await getHistoriesService({ prisma, currentUserId });
  },
);

const getHistoryInputSchema = z.object({ historyId: z.string() });
const getHistory = privateProcedure
  .input(getHistoryInputSchema)
  .query(async ({ input: { historyId } }) => {
    return await getHistoryService({ prisma, historyId });
  });

export const historiesRouter = router({ getHistories, getHistory });
