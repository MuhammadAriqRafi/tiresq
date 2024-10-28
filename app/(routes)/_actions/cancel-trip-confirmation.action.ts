'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'
import createTripExperienceUseCase from '@/src/application/use-cases/create-trip-experiece.use-case'
import toggleTripStatusUseCase from '@/src/application/use-cases/toggle-trip-status.use-case'
import { getInjection } from '@/src/di/container'
import { AuthenticationError } from '@/src/entities/errors/authentication'

const CancelTripConfirmationInputSchema = z.object({
  tripId: z.string().min(1),
  cause: z.enum(['COMPLETE', 'CANCEL'], {
    message: 'Silahkan pilih alasan terlebih dahulu',
  }),
})

export const cancelTripConfirmation = createServerAction()
  .input(CancelTripConfirmationInputSchema, { type: 'formData' })
  .handler(async ({ input }) => {
    const authenticationService = getInjection('IAuthenticationService')
    const user = await authenticationService.getUser()

    if (user === null)
      throw new AuthenticationError('Anda harus login terlebih dahulu')

    if (input.cause === 'CANCEL')
      return await toggleTripStatusUseCase({
        tripId: input.tripId,
        status: 'CANCELLED',
      })

    if (input.cause === 'COMPLETE') {
      const transactionManagerService = getInjection(
        'ITransactionManagerService'
      )

      return await transactionManagerService.startTransaction(async (trx) => {
        await createTripExperienceUseCase({ tripId: input.tripId }, trx)
        await toggleTripStatusUseCase(
          {
            tripId: input.tripId,
            status: 'COMPLETED',
          },
          trx
        )
      })
    }
  })
