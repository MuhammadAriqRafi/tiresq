import { appRouter } from "@/server/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
