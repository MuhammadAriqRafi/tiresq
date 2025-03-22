import { getInjection } from '@/src/di/container'
import { NotFoundError } from '@/src/entities/errors/common'

export default async function rateOrReviewServiceExperienceUseCase({
  escortId,
  rating,
  review,
  isAnonymous,
}: {
  escortId: string
  rating: number
  review?: string
  isAnonymous: boolean
}) {
  const serviceExperienceRepository = getInjection(
    'IServiceExperiencesRepository'
  )
  const serviceExperience =
    await serviceExperienceRepository.getServiceExperiences({
      where: { escort_id: escortId },
      select: { rating: true },
    })

  if (serviceExperience.length < 1)
    throw new NotFoundError('Perjalanan tidak ditemukan')

  await serviceExperienceRepository.updateServiceExperience(escortId, {
    rating,
    review,
    is_anonymous: isAnonymous,
    rated_at: serviceExperience[0].rating === null ? Date.now() : undefined,
    reviewed_at: review ? Date.now() : undefined,
  })
}
