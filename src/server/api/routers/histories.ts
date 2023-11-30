import { privateProcedure, router } from "../trpc";
import { getHistoryInputSchema } from "../input-schemas/histories-input-schema";
import {
  getHistory as getHistoryService,
  getHistories as getHistoriesService,
} from "../services/histories-service";

const getHistories = privateProcedure.query(
  async ({ ctx: { currentUserId } }) => {
    return await getHistoriesService({ currentUserId });
  },
);

const getHistory = privateProcedure
  .input(getHistoryInputSchema)
  .query(async ({ input: { historyId } }) => {
    return await getHistoryService({ historyId });
  });

export const historiesRouter = router({ getHistories, getHistory });
