import 'server-only'
import { parseDateToHumanreadableFormat } from '@/lib/utils'
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

  return {
    id: trip[0].experience.id,
    isAnonymous: trip[0].experience.isAnonymous,
    tripDestinationName: trip[0].destination.name,
    tripCreatedAt: parseDateToHumanreadableFormat(trip[0].createdAt),
    rating: trip[0].experience.rating,
    review: trip[0].experience.review,
  } satisfies TripExperience
}
