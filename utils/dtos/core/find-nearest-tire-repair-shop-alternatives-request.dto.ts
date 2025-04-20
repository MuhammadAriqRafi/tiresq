import { z } from 'zod'

export const FindNearestTireRepairShopAlternativesRequestSchema = z.object({
  origin: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})
