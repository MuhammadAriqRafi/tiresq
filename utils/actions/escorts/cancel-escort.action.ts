'use server'

import { revalidatePath } from 'next/cache'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import toggleTripStatusUseCase from '@/src/application/use-cases/toggle-escort-status.use-case'
import { CancelEscortRequestSchema } from '@/utils/dtos/escorts/cancel-escort-request.dto'

const cancelEscortAction = authenticatedProcedure
  .createServerAction()
  .input(CancelEscortRequestSchema)
  .handler(async ({ input }) => {
    await toggleTripStatusUseCase({
      escortId: input.escortId,
      status: 'CANCELLED',
    })

    revalidatePath('/histories')
    return { message: 'Perjalanan kamu berhasil dibatalin' }
  })

export default cancelEscortAction
