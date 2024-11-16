'use server'

import { z } from 'zod'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import extendTripExpiryPeriodUseCase from '@/src/application/use-cases/extend-trip-expiry-period.use-case'
import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-trip.use-case'

const ContinueTripInputSchema = z.object({
  tripId: z.string().min(1),
})

const continueTrip = authenticatedProcedure
  .createServerAction()
  .input(ContinueTripInputSchema)
  .handler(async ({ input, ctx }) => {
    await extendTripExpiryPeriodUseCase({ tripId: input.tripId })
    return getOnProgressTripUseCase({ userId: ctx.user.id })
  })

export default continueTrip
