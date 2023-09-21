import superjson from "superjson";
import { ZodError } from "zod";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create({
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
