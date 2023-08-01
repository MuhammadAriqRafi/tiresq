import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
