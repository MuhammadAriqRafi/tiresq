import { historiesRouter } from "./routers/histories";
import { router } from "./trpc";

export const appRouter = router({
  histories: historiesRouter,
});

export type AppRouter = typeof appRouter;
