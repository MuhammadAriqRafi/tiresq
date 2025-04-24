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
        id: true,
        name: true,
        rating: true,
        is_open: true,
        latitude: true,
        longitude: true,
        service_cost_in_rupiah: true,
        visits: { where: { status: 'COMPLETED' }, select: { id: true } },
        operating_hours: {
          select: {
            days_of_week: true,
            close_time: true,
            open_time: true,
            is_holiday: true,
          },
        },
      },
    })
  ).map((tireRepairShop) => ({
    id: tireRepairShop.id,
    name: tireRepairShop.name,
    rating: tireRepairShop.rating.toNumber(),
    isOpen: tireRepairShop.is_open,
    latitude: tireRepairShop.latitude,
    longitude: tireRepairShop.longitude,
    serviceCostInRupiah: tireRepairShop.service_cost_in_rupiah,
    visits: tireRepairShop.visits,
    operatingHours: tireRepairShop.operating_hours.map((operatingHour) => ({
      daysOfWeek: operatingHour.days_of_week,
      closeTime: formatDateTimeToTime(operatingHour.close_time),
      openTime: formatDateTimeToTime(operatingHour.open_time),
      isHoliday: operatingHour.is_holiday,
    })),
  }))

  if (tireRepairShop.length < 1) return null
  return tireRepairShop[0]
}

function formatDateTimeToTime(datetime: Date) {
  const date = new Date(datetime)
  return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
}
