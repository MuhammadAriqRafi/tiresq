import { Days } from '@prisma/client'
import 'server-only'
import { customAlphabetNanoid } from '@/lib/utils'
import { getInjection } from '@/src/di/container'

export default async function createTireRepairShopUseCase({
  ownerId,
  tireRepairShopLatitude,
  tireRepairShopLongitude,
  tireRepairShopName,
}: {
  ownerId: string
  tireRepairShopName: string
  tireRepairShopLongitude: number
  tireRepairShopLatitude: number
}) {
  const tireRepairShopRepository = getInjection('ITireRepairShopsRepository')
  await tireRepairShopRepository.createTireRepairShop({
    id: `TRS-${customAlphabetNanoid()}`,
    owner_id: ownerId,
    name: tireRepairShopName,
    rating: 0,
    latitude: tireRepairShopLatitude,
    longitude: tireRepairShopLongitude,
    created_at: Date.now(),
    service_cost_in_rupiah: 15000,
    operating_hours: {
      createMany: {
        data: Object.keys(Days).map((day) => ({
          days_of_week: day as Days,
          open_time: new Date(new Date().setUTCHours(9, 0, 0, 0)),
          close_time: new Date(new Date().setUTCHours(17, 0, 0, 0)),
          is_holiday: day === Days.SUNDAY,
        })),
      },
    },
  })
}
