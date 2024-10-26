'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'
import extendTripExpiryPeriodUseCase from '@/src/application/use-cases/extend-trip-expiry-period.use-case'
import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-trip.use-case'
import { getInjection } from '@/src/di/container'
import { AuthenticationError } from '@/src/entities/errors/authentication'

const ContinueTripInputSchema = z.object({
  tripId: z.string().min(1),
})

export const continueTrip = createServerAction()
  .input(ContinueTripInputSchema)
  .handler(async ({ input }) => {
    const authenticationService = getInjection('IAuthenticationService')
    const user = await authenticationService.getUser()

    if (user === null)
      throw new AuthenticationError('Anda harus login terlebih dahulu')

    await extendTripExpiryPeriodUseCase({ tripId: input.tripId })
    return getOnProgressTripUseCase({ userId: user.id })
  })
