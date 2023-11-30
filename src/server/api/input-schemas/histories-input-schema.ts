import { z } from "zod";

export const getHistoryInputSchema = z.object({ historyId: z.number() });
