import 'server-only'
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

  // TODO: Format createdAt date to human readable
  return {
    tripId: onProgressTrip[0].id,
    status: onProgressTrip[0].status,
    expiredAt: Number(onProgressTrip[0].expiredAt),
    isExpired: Date.now() > onProgressTrip[0].expiredAt,
    createdAt: new Date(Number(onProgressTrip[0].createdAt)).toLocaleString(),
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
