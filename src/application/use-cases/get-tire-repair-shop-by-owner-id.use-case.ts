import 'server-only'
import {
  formatDateTimeToTime,
  parseDateToHumanreadableFormat,
} from '@/lib/utils'
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
        visits: {
          where: {
            status: 'COMPLETED',
            completed_at: { not: null },
            service_experience: { rating: { not: null } },
          },
          select: {
            id: true,
            user_id: true,
            completed_at: true,
            service_experience: {
              select: {
                review: true,
                rating: true,
                is_anonymous: true,
              },
            },
          },
        },
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
    visits: tireRepairShop.visits.map((visit) => ({
      rating: visit.service_experience?.rating,
      review: visit.service_experience?.review,
      userName: !visit.service_experience?.is_anonymous
        ? visit.user_id
        : 'Anonymous',
      visitAt:
        visit.completed_at !== null
          ? parseDateToHumanreadableFormat(visit.completed_at)
          : null,
    })),
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
