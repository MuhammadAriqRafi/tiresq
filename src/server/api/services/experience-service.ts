"use server";

import EventEmitter from "events";
import { prisma } from "@/server/db";
import { generateResponse } from "@/lib/utils/utils";
import { calculateTireRepairShopRating } from "./tire-repair-shop-service";
import {
  createExperienceInputSchema,
  type CreateExperienceInputSchemaType,
} from "../input-schemas/experiences-input-schema";

export const createExperience = async (
  userInput: CreateExperienceInputSchemaType,
) =>
  generateResponse<null>(async () => {
    const validatedUserInput = createExperienceInputSchema.safeParse(userInput);

    if (!validatedUserInput.success)
      return { status: 400, message: "Bad Request", data: null };

    const {
      data: { historyId, userRating, userReview },
    } = validatedUserInput;

    const { tire_repair_shop_id } = await prisma.trip.update({
      select: { tire_repair_shop_id: true },
      where: { id: historyId },
      data: {
        rating: {
          update: {
            star: userRating,
          },
        },
        review: {
          update: {
            review: userReview,
          },
        },
      },
    });

    const eventEmitter = new EventEmitter();

    eventEmitter.on(
      "calculateTireRepairShopRating",
      (tireRepairShopId: number): void =>
        void calculateTireRepairShopRating(tireRepairShopId),
    );
    eventEmitter.emit("calculateTireRepairShopRating", tire_repair_shop_id);

    return {
      status: 200,
      message: "Terima kasih sudah berbagi pengalamannya!",
      data: null,
    };
  });
