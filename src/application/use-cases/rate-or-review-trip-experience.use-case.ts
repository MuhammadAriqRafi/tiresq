import { getInjection } from '@/src/di/container'
import { NotFoundError } from '@/src/entities/errors/common'

export default async function rateOrReviewTripExperienceUseCase({
  tripId,
  rating,
  review,
  isAnonymous,
}: {
  tripId: string
  rating: number
  review?: string
  isAnonymous: boolean
}) {
  const tripsRepository = getInjection('ITripsRepository')
  const tripExperience = await tripsRepository.getTripExperiences({
    where: { tripId },
    select: { rating: true },
  })

  if (tripExperience.length < 1)
    throw new NotFoundError('Perjalanan tidak ditemukan')

  await tripsRepository.updateTripExperience(tripId, {
    rating,
    review,
    isAnonymous,
    reviewedAt: review ? Date.now() : undefined,
    ratedAt: tripExperience[0].rating === null ? Date.now() : undefined,
  })
}
