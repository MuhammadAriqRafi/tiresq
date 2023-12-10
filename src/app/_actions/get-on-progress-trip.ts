"use server";

import { prisma } from "@/server/db";
import { generateResponse } from "@/lib/utils/utils";
import { getOnProgressTripDetails } from "./utils";

export const getOnProgressTrip = async ({
  userId,
}: GetOnProgressTripParams) => {
  const action = async () => {
    const onProgressTrip = await prisma.trip.findFirst({
      where: { user_id: userId, status: "onprogress" },
      select: { id: true },
    });

    if (onProgressTrip === null)
      return {
        status: 200,
        message: "Kamu sedang tidak mencari tambal ban",
        data: onProgressTrip,
      };

    const onProgressTripDetails = await getOnProgressTripDetails(
      onProgressTrip.id,
    );

    return {
      status: 200,
      message: null,
      data: onProgressTripDetails,
    };
  };

  return await generateResponse<ActionResponseDataType<typeof action>>(action);
};

export type OnProgressTripOutputType = Awaited<
  ReturnType<typeof getOnProgressTrip>
>;
