'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'
import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-trip.use-case'

const FindNearestTireRepairShopSchema = z.object({
  origin: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

export const findNearestTireRepairShop = createServerAction()
  .input(FindNearestTireRepairShopSchema)
  .handler(async ({ input }) => {
    // TODO: Check if the user is authenticated
    // TODO: Call getNearestTireRepairShopUseCase
    // TODO: Call createTripUseCase
    // TODO: Return getOnProgressTripUseCase

    return getOnProgressTripUseCase()
  })
