'use server'

import { revalidatePath } from 'next/cache'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import createServiceExperienceUseCase from '@/src/application/use-cases/create-service-experiece.use-case'
import toggleEscortStatusUseCase from '@/src/application/use-cases/toggle-escort-status.use-case'
import { getInjection } from '@/src/di/container'
import { CompleteEscortRequestSchema } from '@/utils/dtos/escorts/complete-escort-request.dto'

const completeEscortAction = authenticatedProcedure
  .createServerAction()
  .input(CompleteEscortRequestSchema)
  .handler(async ({ input }) => {
    const transactionManagerService = getInjection('ITransactionManagerService')
    await transactionManagerService.startTransaction(async (trx) => {
      await createServiceExperienceUseCase({ escortId: input.escortId }, trx)
      await toggleEscortStatusUseCase(
        {
          escortId: input.escortId,
          status: 'COMPLETED',
        },
        trx
      )
    })

    revalidatePath('/histories')
    return {
      message:
        'Yay!, kamu sudah sampai tujuan, kami tunggu review pengalaman tambal bannya yaa :)',
    }
  })

export default completeEscortAction
