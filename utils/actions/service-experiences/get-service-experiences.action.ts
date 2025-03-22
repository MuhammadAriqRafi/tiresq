'use server'

import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getServiceExperiencesUseCase from '@/src/application/use-cases/get-service-experiences.use-case'
import { GetServiceExperiencesRequestSchema } from '@/utils/dtos/service-experiences/get-service-experiences-request.dto'

const getServiceExperienceAction = authenticatedProcedure
  .createServerAction()
  .input(GetServiceExperiencesRequestSchema)
  .handler(async ({ input }) => {
    return getServiceExperiencesUseCase({ escortId: input.escortId })
  })

export default getServiceExperienceAction
