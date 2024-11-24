'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getDestinationIdFromTripUseCase from '@/src/application/use-cases/get-destination-id-from-trip.use-case'
import rateOrReviewTripExperienceUseCase from '@/src/application/use-cases/rate-or-review-trip-experience.use-case'
import recalculateTireRepairShopRatingUseCase from '@/src/application/use-cases/recalculate-tire-repair-shop-rating.use-case'
import updateTireRepairShopRatingUseCase from '@/src/application/use-cases/update-tire-repair-shop-rating.use-case'

const RateOrReviewTripExperienceInputSchema = z
  .object({
    tripId: z.string().min(1),
    review: z.string().optional(),
    rating: z.coerce.number(),
    isAnonymous: z.coerce.boolean(),
  })
  .superRefine(({ rating }, ctx) => {
    if (rating < 1)
      ctx.addIssue({
        code: 'custom',
        message: 'Masukkan jumlah bintangnya dulu yaa',
        path: ['rating'],
      })
  })
  .transform((input) => {
    if (input.review === '') return { ...input, review: undefined }
    return input
  })

const rateOrReviewTripExperience = authenticatedProcedure
  .createServerAction()
  .input(RateOrReviewTripExperienceInputSchema, { type: 'formData' })
  .handler(async ({ input }) => {
    await rateOrReviewTripExperienceUseCase({
      rating: input.rating,
      review: input.review,
      tripId: input.tripId,
      isAnonymous: input.isAnonymous,
    })

    revalidatePath('/histories')

    const tripDestinationId = getDestinationIdFromTripUseCase({
      tripId: input.tripId,
    })
    const tireRepairShopNewRating = recalculateTireRepairShopRatingUseCase({
      tireRepairShopId: tripDestinationId,
    })
    updateTireRepairShopRatingUseCase({
      tireRepairShopId: tripDestinationId,
      rating: tireRepairShopNewRating,
    })
  })

export default rateOrReviewTripExperience
