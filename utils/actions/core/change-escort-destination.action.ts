'use server'

import { authenticatedProcedure } from '@/lib/zsa/procedures'
import changeEscortDestinationUseCase from '@/src/application/use-cases/change-escort-destination.use-case'
import { ChangeEscortDestinationRequestSchema } from '@/utils/dtos/core/change-escort-destination-request.dto'

const changeEscortDestination = authenticatedProcedure
  .createServerAction()
  .input(ChangeEscortDestinationRequestSchema)
  .handler(async ({ input }) => {
    await changeEscortDestinationUseCase({
      destinationId: input.destinationId,
      escortId: input.escortId,
    })
    return { message: 'Berhasil merubah tujuan' }
  })

export default changeEscortDestination
