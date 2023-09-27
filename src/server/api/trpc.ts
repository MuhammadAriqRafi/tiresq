import superjson from "superjson";
import { auth } from "@clerk/nextjs";
import { ZodError } from "zod";
import { TRPCError, initTRPC } from "@trpc/server";

export const createContext = () => {
  const { userId } = auth();
  return { currentUserId: userId };
};

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  allowOutsideOfServer: true,
  errorFormatter({ shape, error }) {
    const errorOutput = {
      code: shape.data.httpStatus,
      message: shape.message,
      data: {
        validationError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };

    return errorOutput;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(
  async ({ ctx: { currentUserId }, next }) => {
    if (currentUserId === null)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Kamu harus login terlebih dahulu ya",
      });
    return next({ ctx: { currentUserId } });
  },
);

export const privateProcedure = t.procedure.use(enforceUserIsAuthed);
