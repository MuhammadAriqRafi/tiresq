'use server'

import { EscortStatus } from '@prisma/client'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getEscortsUseCase from '@/src/application/use-cases/get-escorts.use-case'
import { GetEscortHistoriesSearchParamsSchema } from '@/utils/dtos/histories/get-escort-histories-search-params.dto'

const getEscorts = authenticatedProcedure
  .createServerAction()
  .input(GetEscortHistoriesSearchParamsSchema)
  .handler(async ({ input, ctx }) => {
    return await getEscortsUseCase(ctx.user.id, {
      status: input.status as EscortStatus,
      createdAt: input.createdAt,
    })
  })

export default getEscorts
