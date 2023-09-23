import { historiesRouter } from "./routers/histories";
import { tripsRouter } from "./routers/trips";
import { router } from "./trpc";

export const appRouter = router({
  histories: historiesRouter,
  trips: tripsRouter,
});

export type AppRouter = typeof appRouter;
