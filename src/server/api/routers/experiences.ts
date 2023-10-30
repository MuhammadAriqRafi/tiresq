import { privateProcedure, router } from "../trpc";
import { getExperienceInputSchema } from "../input-schemas/experiences-input-schema";
import { getHistory } from "../services/histories-service";
import { TRPCError } from "@trpc/server";

const getExperience = privateProcedure
  .input(getExperienceInputSchema)
  .query(async ({ input: { historyId } }) => {
    try {
      return await getHistory({ historyId });
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });

export const experiencesRouter = router({ getExperience });
