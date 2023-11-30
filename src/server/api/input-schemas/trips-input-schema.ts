import { z } from "zod";

const userCurrentCoordinateSchema = z.object({
  userCurrentCoordinate: z.object({
    longitude: z.number(),
    latitude: z.number(),
  }),
});

export const getOnProgressTripDetailsInputSchema = userCurrentCoordinateSchema;
export const createTripInputSchema = userCurrentCoordinateSchema;

export type CreateTripInputSchemaType = z.infer<typeof createTripInputSchema>;
