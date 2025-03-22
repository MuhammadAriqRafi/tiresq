import { z } from 'zod'

export const RateOrReviewServiceExperienceRequestSchema = z.object({
  escortId: z.string().min(1).max(12),
  isAnonymous: z.coerce.boolean(),
  review: z
    .string()
    .max(1000)
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  rating: z.coerce
    .number()
    .gte(1, { message: 'Masukkan jumlah bintangnya dulu yaa' })
    .lte(5, { message: 'Maksimal bintang 5 yaa' }),
})

export type RateOrReviewServiceExperienceRequestDto = z.infer<
  typeof RateOrReviewServiceExperienceRequestSchema
>
