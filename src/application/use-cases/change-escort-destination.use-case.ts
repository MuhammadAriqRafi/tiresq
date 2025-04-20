import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import env from '@/env'
import { getInjection } from '@/src/di/container'
import { NotFoundError } from '@/src/entities/errors/common'

export default async function changeEscortDestinationUseCase(
  {
    escortId,
    destinationId,
  }: {
    escortId: string
    destinationId: string
  },
  trx?: PrismaTransactionalClient
) {
  const tireRepairShopRepository = getInjection('ITireRepairShopsRepository')
  const tireRepairShop = await tireRepairShopRepository.getTireRepairShops(
    {
      where: { id: destinationId },
      select: { name: true },
    },
    trx
  )

  if (tireRepairShop.length < 1)
    throw new NotFoundError('Tambal ban tidak tersedia')

  const escortsRepository = getInjection('IEscortsRepository')
  await escortsRepository.updateEscort(
    escortId,
    {
      destination_name: tireRepairShop[0].name,
      destination: { connect: { id: destinationId } },
      created_at: Date.now(),
      expired_at: Date.now() + env.ESCORT_EXPIRY_PERIOD_IN_MILLISECONDS,
    },
    trx
  )
}
