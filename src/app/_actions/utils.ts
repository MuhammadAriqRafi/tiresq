import { prisma } from "@/server/db";

export const getOnProgressTripDetails = async (tripId: number) =>
  await prisma.trip.findUniqueOrThrow({
    where: { id: tripId },
    select: {
      id: true,
      destination: {
        select: {
          name: true,
          rating: true,
          latitude: true,
          longitude: true,
        },
      },
      detail: {
        select: {
          duration: true,
          distance: true,
          coords_to_destination: true,
        },
      },
    },
  });
