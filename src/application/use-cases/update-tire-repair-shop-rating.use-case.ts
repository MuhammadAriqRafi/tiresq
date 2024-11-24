import { getInjection } from '@/src/di/container'

export default async function updateTireRepairShopRatingUseCase({
  tireRepairShopId,
  rating,
}: {
  tireRepairShopId: Promise<number>
  rating: Promise<number>
}) {
  if ((await rating) === -1) return null

  const tireRepairShopsRepository = getInjection('ITireRepairShopsRepository')
  await tireRepairShopsRepository.updateTireRepairShop(await tireRepairShopId, {
    rating: await rating,
  })
}
