'use server'

import { authenticatedProcedure } from '@/lib/zsa/procedures'
import createServiceExperienceUseCase from '@/src/application/use-cases/create-service-experiece.use-case'
import toggleEscortStatusUseCase from '@/src/application/use-cases/toggle-escort-status.use-case'
import { getInjection } from '@/src/di/container'
import { CancelEscortConfirmationRequestSchema } from '@/utils/dtos/escorts/cancel-escort-confirmation-request.dto'

const cancelEscortConfirmationAction = authenticatedProcedure
  .createServerAction()
  .input(CancelEscortConfirmationRequestSchema)
  .handler(async ({ input }) => {
    if (input.cause === 'CANCEL') {
      await toggleEscortStatusUseCase({
        escortId: input.escortId,
        status: 'CANCELLED',
      })

      return { message: 'Perjalanan kamu berhasil dibatalin' }
    }

    if (input.cause === 'COMPLETE') {
      const transactionManagerService = getInjection(
        'ITransactionManagerService'
      )

      return await transactionManagerService.startTransaction(async (trx) => {
        await createServiceExperienceUseCase({ escortId: input.escortId }, trx)
        await toggleEscortStatusUseCase(
          {
            escortId: input.escortId,
            status: 'COMPLETED',
          },
          trx
        )

        return {
          message:
            'Yay!, kamu sudah sampai tujuan, kami tunggu review pengalaman tambal bannya yaa :)',
        }
      })
    }
  })

export default cancelEscortConfirmationAction
