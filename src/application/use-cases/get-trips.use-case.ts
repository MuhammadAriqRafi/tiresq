import { TripStatus } from '@prisma/client'
import 'server-only'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'
import { parseDateToHumanreadableFormat } from '@/lib/utils'
import { getInjection } from '@/src/di/container'

export default async function getTripsUseCase(filters?: {
  userId?: string
  status?: TripStatus
  createdAt?: number
}) {
  const tripsRepository = getInjection('ITripsRepository')
  const trips = await tripsRepository.getTrips({
    take: DEFAULT_PAGE_SIZE,
    where: filters
      ? {
          userId: filters.userId,
          status: filters.status,
          createdAt: { lt: filters.createdAt },
        }
      : {},
    select: {
      id: true,
      status: true,
      createdAt: true,
      destination: { select: { name: true } },
      experience: { select: { rating: true, review: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (trips.length < 1) return null
  return trips.map((trip) => ({
    id: trip.id,
    name: trip.destination.name,
    rating: trip.experience !== null ? trip.experience.rating : null,
    review: trip.experience !== null ? trip.experience.review : null,
    status: trip.status,
    isExpired: false,
    createdAt: parseDateToHumanreadableFormat(trip.createdAt),
    createdAtRaw: Number(trip.createdAt),
  })) satisfies Histories
}
