"use server";

import { prisma } from "@/server/db";
import { generateResponse } from "@/lib/utils/utils";
import {
  createExperienceInputSchema,
  type CreateExperienceInputSchemaType,
} from "../input-schemas/experiences-input-schema";

export const createExperience = async (
  userInput: CreateExperienceInputSchemaType,
) =>
  generateResponse(async (): Promise<GenerateResponseOutput<null>> => {
    const validatedUserInput = createExperienceInputSchema.safeParse(userInput);

    if (!validatedUserInput.success)
      return { isError: true, message: "Bad Request", data: null };

    const {
      data: { historyId, userRating, userReview },
    } = validatedUserInput;

    await prisma.trip.update({
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

    return {
      isError: false,
      message: "Terima kasih sudah berbagi pengalamannya!",
      data: null,
    };
  });
