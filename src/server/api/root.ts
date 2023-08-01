import { createTRPCRouter } from "@/server/api/trpc";
import { tripsRouter } from "./routers/trips";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  trips: tripsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
