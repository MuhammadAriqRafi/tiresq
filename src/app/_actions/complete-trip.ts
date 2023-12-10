"use server";

import { auth } from "@clerk/nextjs";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { generateResponse } from "@/lib/utils/utils";

export const completeTrip = (tripId: number) =>
  generateResponse<null>(async () => {
    const { userId } = auth();

    if (userId === null)
      return {
        status: 403,
        message: "Kamu harus login terlebih dahulu",
        data: null,
      };

    await prisma.$transaction(async (PrismaClient) => {
      const { id: newlyCreatedTripExperienceId } =
        await prisma.tripExperience.create({
          select: { id: true },
          data: {
            rating_updated_at: new Date(),
            review_updated_at: new Date(),
          },
        });

      await PrismaClient.trip.update({
        where: { id: tripId, status: { equals: "onprogress" } },
        data: {
          status: "completed",
          trip_experience_id: newlyCreatedTripExperienceId,
        },
      });
    });

    revalidatePath("/");

    return {
      status: 200,
      message: "Yay, kamu sudah sampai ditujuan",
      data: null,
    };
  });
