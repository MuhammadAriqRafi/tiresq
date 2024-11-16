'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import rateOrReviewTripExperienceUseCase from '@/src/application/use-cases/rate-or-review-trip-experience.use-case'

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
  })

export default rateOrReviewTripExperience
