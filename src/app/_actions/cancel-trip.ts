"use server";

import { auth } from "@clerk/nextjs";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { generateResponse } from "@/lib/utils/utils";

export const cancelTrip = (tripId: number) =>
  generateResponse<null>(async () => {
    const { userId } = auth();

    if (userId === null)
      return {
        status: 403,
        message: "Kamu harus login terlebih dahulu",
        data: null,
      };

    await prisma.trip.update({
      where: { id: tripId },
      data: { status: "cancelled" },
    });

    revalidatePath("/");

    return {
      status: 200,
      message: "Berhasil batalin perjalanan",
      data: null,
    };
  });
