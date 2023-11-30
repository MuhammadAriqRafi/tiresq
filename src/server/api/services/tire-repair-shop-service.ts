"use server";

import { prisma } from "@/server/db";

export const calculateTireRepairShopRating = async (
  tireRepairShopId: number,
) => {
  try {
    const ratings = await prisma.rating.findMany({
      where: { tire_repair_shop_id: tireRepairShopId, star: { not: null } },
      select: { star: true },
    });

    const eachStarAmount: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    ratings.forEach(({ star }) => {
      if (star !== null) eachStarAmount[star] += 1;
    });

    const tireRepairShopRating =
      Object.keys(eachStarAmount).reduce(
        (accumulator, starAmount) =>
          accumulator + eachStarAmount[+starAmount] * +starAmount,
        0,
      ) / ratings.length;

    await prisma.tireRepairShop.update({
      select: { rating: true },
      where: { id: tireRepairShopId },
      data: { rating: +tireRepairShopRating.toFixed(1) },
    });
  } catch (error) {
    console.log(error);
  }
};
