import 'server-only'
import { getInjection } from '@/src/di/container'

export default async function getTripExperiencesUseCase({
  tripId,
}: {
  tripId: string
}) {
  const tripsRepository = getInjection('ITripsRepository')
  const trip = await tripsRepository.getTrips({
    where: { id: tripId },
    select: {
      createdAt: true,
      destination: { select: { name: true } },
      experience: {
        select: { id: true, rating: true, review: true, isAnonymous: true },
      },
    },
  })

  if (trip.length < 1) return null
  if (trip[0].experience === null) return null

  // TODO: Format createdAt date to human readable
  return {
    id: trip[0].experience.id,
    isAnonymous: trip[0].experience.isAnonymous,
    tripDestinationName: trip[0].destination.name,
    tripCreatedAt: new Date(Number(trip[0].createdAt)).toLocaleString(),
    rating: trip[0].experience.rating,
    review: trip[0].experience.review,
  } satisfies TripExperience
}
