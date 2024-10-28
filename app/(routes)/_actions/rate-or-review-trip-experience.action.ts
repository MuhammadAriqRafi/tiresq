'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'
import rateOrReviewTripExperienceUseCase from '@/src/application/use-cases/rate-or-review-trip-experience.use-case'
import { getInjection } from '@/src/di/container'
import { AuthenticationError } from '@/src/entities/errors/authentication'

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

export const rateOrReviewTripExperience = createServerAction()
  .input(RateOrReviewTripExperienceInputSchema, { type: 'formData' })
  .handler(async ({ input }) => {
    const authenticationService = getInjection('IAuthenticationService')
    const user = await authenticationService.getUser()

    if (user === null)
      throw new AuthenticationError('Anda harus login terlebih dahulu')

    await rateOrReviewTripExperienceUseCase({
      rating: input.rating,
      review: input.review,
      isAnonymous: input.isAnonymous,
      tripId: input.tripId,
    })
  })
