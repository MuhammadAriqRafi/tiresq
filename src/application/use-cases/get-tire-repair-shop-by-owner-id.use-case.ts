import 'server-only'
import { getInjection } from '@/src/di/container'

export default async function getTireRepairShopByOwnerIdUseCase({
  ownerId,
}: {
  ownerId: string
}) {
  const tireRepairShopRepository = getInjection('ITireRepairShopsRepository')
  const tireRepairShop = (
    await tireRepairShopRepository.getTireRepairShops({
      where: { owner_id: ownerId },
      select: {
        name: true,
        rating: true,
        is_open: true,
        latitude: true,
        longitude: true,
        service_cost_in_rupiah: true,
      },
    })
  ).map((tireRepairShop) => ({
    name: tireRepairShop.name,
    rating: tireRepairShop.rating.toNumber(),
    isOpen: tireRepairShop.is_open,
    latitude: tireRepairShop.latitude,
    longitude: tireRepairShop.longitude,
    serviceCostInRupiah: tireRepairShop.service_cost_in_rupiah,
  }))

  if (tireRepairShop.length < 1) return null
  return tireRepairShop[0]
}
