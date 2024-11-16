import 'server-only'
import { parseDateToHumanreadableFormat } from '@/lib/utils'
import { getInjection } from '@/src/di/container'

export default async function getOnProgressTripUseCase({
  userId,
}: {
  userId: string
}) {
  const tripsRepository = getInjection('ITripsRepository')
  const onProgressTrip = await tripsRepository.getTrips({
    where: { userId, status: 'ONPROGRESS' },
    select: {
      id: true,
      status: true,
      createdAt: true,
      expiredAt: true,
      destination: {
        select: { name: true, rating: true, lat: true, lng: true },
      },
    },
  })

  if (onProgressTrip.length < 1) return null

  return {
    tripId: onProgressTrip[0].id,
    status: onProgressTrip[0].status,
    createdAt: parseDateToHumanreadableFormat(onProgressTrip[0].createdAt),
    isExpired: Date.now() > onProgressTrip[0].expiredAt,
    destination: {
      coordinate: {
        lat: onProgressTrip[0].destination.lat,
        lng: onProgressTrip[0].destination.lng,
      },
      name: onProgressTrip[0].destination.name,
      rating: onProgressTrip[0].destination.rating,
    },
  } satisfies OnProgressTrip
}
