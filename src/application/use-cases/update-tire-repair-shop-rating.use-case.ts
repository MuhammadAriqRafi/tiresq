import { getInjection } from '@/src/di/container'

export default async function updateTireRepairShopRatingUseCase({
  tireRepairShopId,
  rating,
}: {
  tireRepairShopId: string
  rating: number
}) {
  if (rating === -1) return null

  const tireRepairShopsRepository = getInjection('ITireRepairShopsRepository')
  await tireRepairShopsRepository.updateTireRepairShop(tireRepairShopId, {
    rating,
  })
}
