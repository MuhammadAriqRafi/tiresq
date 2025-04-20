'use server'

import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getNearestTireRepairShopUseCase from '@/src/application/use-cases/get-nearest-tire-repair-shop.use-case'
import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-escort.use-case'
import { getInjection } from '@/src/di/container'
import { RestrictedActionError } from '@/src/entities/errors/common'
import { FindNearestTireRepairShopAlternativesRequestSchema } from '@/utils/dtos/core/find-nearest-tire-repair-shop-alternatives-request.dto'

const findNearestTireRepairShopAlternatives = authenticatedProcedure
  .createServerAction()
  .input(FindNearestTireRepairShopAlternativesRequestSchema)
  .handler(async ({ input, ctx }) => {
    const transactionManagerService = getInjection('ITransactionManagerService')
    return await transactionManagerService.startTransaction(async (trx) => {
      const onProgressTrip = await getOnProgressTripUseCase(
        { userId: ctx.user.id },
        trx
      )

      if (onProgressTrip === null)
        throw new RestrictedActionError('Anda sedang tidak dalam perjalanan')

      const destinations = (
        await getNearestTireRepairShopUseCase({ origin: input.origin }, trx)
      ).filter(
        (destination) =>
          destination.lat !== onProgressTrip.destination.coordinate.latitude &&
          destination.lng !== onProgressTrip.destination.coordinate.longitude
      )

      return destinations
    })
  })

export default findNearestTireRepairShopAlternatives
