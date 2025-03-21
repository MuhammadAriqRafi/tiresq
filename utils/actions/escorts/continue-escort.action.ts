'use server'

import { authenticatedProcedure } from '@/lib/zsa/procedures'
import extendTripExpiryPeriodUseCase from '@/src/application/use-cases/extend-escort-expiry-period.use-case'
import { ContinueEscortRequestSchema } from '@/utils/dtos/escorts/continue-escort-request.dto'

const continueEscort = authenticatedProcedure
  .createServerAction()
  .input(ContinueEscortRequestSchema)
  .handler(async ({ input }) => {
    await extendTripExpiryPeriodUseCase({ escortId: input.escortId })
  })

export default continueEscort
