'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import createTripExperienceUseCase from '@/src/application/use-cases/create-trip-experiece.use-case'
import toggleTripStatusUseCase from '@/src/application/use-cases/toggle-trip-status.use-case'
import { getInjection } from '@/src/di/container'

const CompleteTripSchema = z.object({
  tripId: z.string().min(1),
})

const completeTrip = authenticatedProcedure
  .createServerAction()
  .input(CompleteTripSchema)
  .handler(async ({ input }) => {
    const transactionManagerService = getInjection('ITransactionManagerService')
    await transactionManagerService.startTransaction(async (trx) => {
      await createTripExperienceUseCase({ tripId: input.tripId }, trx)
      await toggleTripStatusUseCase(
        {
          tripId: input.tripId,
          status: 'COMPLETED',
        },
        trx
      )
    })

    return redirect(`/experiences/${input.tripId}`)
  })

export default completeTrip
