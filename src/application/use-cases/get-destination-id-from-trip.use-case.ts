import { getInjection } from '@/src/di/container'
import { NotFoundError } from '@/src/entities/errors/common'

export default async function getDestinationIdFromTripUseCase({
  tripId,
}: {
  tripId: string
}) {
  const tripsRepository = getInjection('ITripsRepository')
  const trip = await tripsRepository.getTrips({
    where: { id: tripId },
    select: { destinationId: true },
  })

  if (trip.length < 1) throw new NotFoundError('Perjalanan tidak ditemukan')
  return trip[0].destinationId
}
