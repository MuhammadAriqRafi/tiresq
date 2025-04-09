import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import { getInjection } from '@/src/di/container'

export default async function toggleTireRepairShopAvailabilityUseCase(
  {
    tireRepairShopId,
    isOpen,
  }: {
    tireRepairShopId: string
    isOpen: boolean
  },
  trx?: PrismaTransactionalClient
) {
  const tireRepairShopRepository = getInjection('ITireRepairShopsRepository')
  await tireRepairShopRepository.updateTireRepairShop(
    tireRepairShopId,
    { is_open: isOpen },
    trx
  )
}
