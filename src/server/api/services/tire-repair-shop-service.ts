"use server";

import { prisma } from "@/server/db";

export const calculateTireRepairShopRating = async (
  tireRepairShopId: number,
) => {
  try {
    const ratings = await prisma.trip.findMany({
      select: { experience: { select: { rating: true } } },
      where: {
        tire_repair_shop_id: tireRepairShopId,
        experience: { rating: { not: null } },
      },
    });

    const eachStarAmount: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    ratings.forEach(({ experience }) => {
      if (experience?.rating !== null) eachStarAmount[experience!.rating] += 1;
    });

    const tireRepairShopRating =
      Object.keys(eachStarAmount).reduce(
        (accumulator, starAmount) =>
          accumulator + eachStarAmount[+starAmount] * +starAmount,
        0,
      ) / ratings.length;

    await prisma.tireRepairShop.update({
      where: { id: tireRepairShopId },
      data: { rating: +tireRepairShopRating.toFixed(1) },
    });
  } catch (error) {
    console.log(error);
  }
};
