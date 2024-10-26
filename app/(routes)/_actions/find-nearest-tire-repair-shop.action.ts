'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'
import createTripUseCase from '@/src/application/use-cases/create-trip.use-case'
import getNearestTireRepairShopUseCase from '@/src/application/use-cases/get-nearest-tire-repair-shop.use-case'
import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-trip.use-case'
import { getInjection } from '@/src/di/container'
import { AuthenticationError } from '@/src/entities/errors/authentication'

const FindNearestTireRepairShopSchema = z.object({
  origin: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

export const findNearestTireRepairShop = createServerAction()
  .input(FindNearestTireRepairShopSchema)
  .handler(async ({ input }) => {
    const authenticationService = getInjection('IAuthenticationService')
    const user = await authenticationService.getUser()

    if (user === null)
      throw new AuthenticationError('Anda harus login terlebih dahulu')

    const onProgressTrip = await getOnProgressTripUseCase({ userId: user.id })
    if (onProgressTrip !== null) throw new Error('Anda sedang dalam perjalanan')

    const destination = await getNearestTireRepairShopUseCase({
      origin: input.origin,
    })

    await createTripUseCase(
      { userId: user.id, destinationId: destination.id },
      { checkOnProgressTripBeforeCreating: false }
    )
    return getOnProgressTripUseCase({ userId: user.id })
  })
