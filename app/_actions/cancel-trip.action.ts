'use server'

import { z } from 'zod'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import toggleTripStatusUseCase from '@/src/application/use-cases/toggle-trip-status.use-case'

const CancelTripSchema = z.object({
  tripId: z.string().min(1),
})

const cancelTrip = authenticatedProcedure
  .createServerAction()
  .input(CancelTripSchema)
  .handler(async ({ input }) => {
    await toggleTripStatusUseCase({
      tripId: input.tripId,
      status: 'CANCELLED',
    })
  })

export default cancelTrip
