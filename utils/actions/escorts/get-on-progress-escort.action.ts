'use server'

import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getOnProgressEscortUseCase from '@/src/application/use-cases/get-on-progress-escort.use-case'

const getOnProgressEscort = authenticatedProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const onProgressEscort = await getOnProgressEscortUseCase({
      userId: ctx.user.id,
    })

    return onProgressEscort
  })

export default getOnProgressEscort
