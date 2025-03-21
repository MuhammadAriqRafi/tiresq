import { z } from 'zod'

export const FindNearestTireRepairShopRequestSchema = z.object({
  origin: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})
