import { experiencesRouter } from "./routers/experiences";
import { historiesRouter } from "./routers/histories";
import { router } from "./trpc";

export const appRouter = router({
  experiences: experiencesRouter,
  histories: historiesRouter,
});

export type AppRouter = typeof appRouter;
