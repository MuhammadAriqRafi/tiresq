'use server'

import { revalidatePath } from 'next/cache'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import createEscortUseCase from '@/src/application/use-cases/create-escort.use-case'
import getNearestTireRepairShopUseCase from '@/src/application/use-cases/get-nearest-tire-repair-shop.use-case'
import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-escort.use-case'
import { getInjection } from '@/src/di/container'
import { RestrictedActionError } from '@/src/entities/errors/common'
import { FindNearestTireRepairShopRequestSchema } from '@/utils/dtos/core/find-nearest-tire-repair-shop-request.dto'

const findNearestTireRepairShop = authenticatedProcedure
  .createServerAction()
  .input(FindNearestTireRepairShopRequestSchema)
  .handler(async ({ input, ctx }) => {
    const transactionManagerService = getInjection('ITransactionManagerService')
    await transactionManagerService.startTransaction(async (trx) => {
      const onProgressTrip = await getOnProgressTripUseCase(
        { userId: ctx.user.id },
        trx
      )

      if (onProgressTrip !== null)
        throw new RestrictedActionError('Anda sedang dalam perjalanan')

      const destination = await getNearestTireRepairShopUseCase(
        { origin: input.origin },
        trx
      )

      await createEscortUseCase(
        { userId: ctx.user.id, destinationId: destination.id },
        { checkHasOnProgressTripBeforeCreating: false, trx }
      )
    })

    revalidatePath('/histories')
  })

export default findNearestTireRepairShop
