'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'
import createTripExperienceUseCase from '@/src/application/use-cases/create-trip-experiece.use-case'
import toggleTripStatusUseCase from '@/src/application/use-cases/toggle-trip-status.use-case'
import { getInjection } from '@/src/di/container'
import { AuthenticationError } from '@/src/entities/errors/authentication'

const CompleteTripSchema = z.object({
  tripId: z.string().min(1),
})

export const completeTrip = createServerAction()
  .input(CompleteTripSchema)
  .handler(async ({ input }) => {
    const authenticationService = getInjection('IAuthenticationService')
    const user = await authenticationService.getUser()

    if (user === null)
      throw new AuthenticationError('Anda harus login terlebih dahulu')

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
