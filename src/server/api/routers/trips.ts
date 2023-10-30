import { TRPCError } from "@trpc/server";
import { router, privateProcedure } from "@/server/api/trpc";
import { getOnProgressTrip, createTripDetails } from "../services/trip-service";
import { getOnProgressTripDetailsInputSchema } from "../input-schemas/trips-input-schema";

const getOnProgressTripDetails = privateProcedure
  .input(getOnProgressTripDetailsInputSchema)
  .query(
    async ({ ctx: { currentUserId }, input: { userCurrentCoordinate } }) => {
      try {
        const onprogressTrip = await getOnProgressTrip({ currentUserId });

        if (onprogressTrip !== null) {
          return await createTripDetails({
            tripId: onprogressTrip.id,
            userCurrentCoordinate,
            destination: {
              id: onprogressTrip.destination.id,
              name: onprogressTrip.destination.name,
              latitude: Number(onprogressTrip.destination.latitude),
              longitude: Number(onprogressTrip.destination.longitude),
            },
          });
        }

        return null;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Maaf, terjadi kesalahan pada server, coba lagi nanti ya",
        });
      }
    },
  );

export const tripsRouter = router({ getOnProgressTripDetails });
