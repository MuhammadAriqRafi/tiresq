'use server'

import { z } from 'zod'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import createTripUseCase from '@/src/application/use-cases/create-trip.use-case'
import getNearestTireRepairShopUseCase from '@/src/application/use-cases/get-nearest-tire-repair-shop.use-case'
import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-trip.use-case'
import { NotFoundError } from '@/src/entities/errors/common'

const FindNearestTireRepairShopSchema = z.object({
  origin: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

const findNearestTireRepairShop = authenticatedProcedure
  .createServerAction()
  .input(FindNearestTireRepairShopSchema)
  .handler(async ({ input, ctx }) => {
    const onProgressTrip = await getOnProgressTripUseCase({
      userId: ctx.user.id,
    })

    if (onProgressTrip !== null)
      throw new NotFoundError('Anda sedang dalam perjalanan')

    const destination = await getNearestTireRepairShopUseCase({
      origin: input.origin,
    })

    await createTripUseCase(
      { userId: ctx.user.id, destinationId: destination.id },
      { checkHasOnProgressTripBeforeCreating: false }
    )

    return getOnProgressTripUseCase({ userId: ctx.user.id })
  })

export default findNearestTireRepairShop
