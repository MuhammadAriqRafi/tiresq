import 'server-only'
import { getInjection } from '@/src/di/container'

export default async function getTireRepairShopsUseCase() {
  const tireRepairShopRepository = getInjection('ITireRepairShopsRepository')
  const tireRepairShops = (
    await tireRepairShopRepository.getTireRepairShops({
      select: {
        id: true,
        name: true,
        rating: true,
        is_open: true,
      },
    })
  ).map((tireRepairShop) => ({
    id: tireRepairShop.id,
    name: tireRepairShop.name,
    isOpen: tireRepairShop.is_open,
    rating: tireRepairShop.rating.toNumber(),
  }))

  return tireRepairShops
}
