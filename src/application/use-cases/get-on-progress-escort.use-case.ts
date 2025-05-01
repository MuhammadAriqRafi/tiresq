import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import {
  formatDateTimeToTime,
  parseDateToHumanreadableFormat,
} from '@/lib/utils'
import { getInjection } from '@/src/di/container'

export default async function getOnProgressEscortUseCase(
  {
    userId,
  }: {
    userId: string
  },
  trx?: PrismaTransactionalClient
) {
  const escortsRepository = getInjection('IEscortsRepository')
  const onProgressEscort = await escortsRepository.getEscorts(
    {
      where: { user_id: userId, status: 'ONPROGRESS' },
      select: {
        id: true,
        status: true,
        created_at: true,
        expired_at: true,
        destination: {
          select: {
            name: true,
            rating: true,
            latitude: true,
            longitude: true,
            service_cost_in_rupiah: true,
            operating_hours: {
              select: {
                close_time: true,
                open_time: true,
                days_of_week: true,
                is_holiday: true,
              },
            },
          },
        },
      },
    },
    trx
  )

  if (onProgressEscort.length < 1) return null

  return {
    escortId: onProgressEscort[0].id,
    status: onProgressEscort[0].status,
    createdAt: parseDateToHumanreadableFormat(onProgressEscort[0].created_at),
    isExpired: Date.now() > onProgressEscort[0].expired_at,
    destination: {
      name: onProgressEscort[0].destination.name,
      rating: onProgressEscort[0].destination.rating.toNumber(),
      operatingHours: onProgressEscort[0].destination.operating_hours.map(
        (operatingHour) => ({
          daysOfWeek: operatingHour.days_of_week,
          closeTime: formatDateTimeToTime(operatingHour.close_time),
          openTime: formatDateTimeToTime(operatingHour.open_time),
          isHoliday: operatingHour.is_holiday,
        })
      ),
      serviceCostInRupiah:
        onProgressEscort[0].destination.service_cost_in_rupiah,
      coordinate: {
        latitude: onProgressEscort[0].destination.latitude,
        longitude: onProgressEscort[0].destination.longitude,
      },
    },
  } satisfies OnProgressEscort
}
