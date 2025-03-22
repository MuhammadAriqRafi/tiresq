import 'server-only'
import { parseDateToHumanreadableFormat } from '@/lib/utils'
import { getInjection } from '@/src/di/container'

export default async function getServiceExperiencesUseCase({
  escortId,
}: {
  escortId: string
}) {
  const serviceExperienceRepository = getInjection(
    'IServiceExperiencesRepository'
  )
  const serviceExperience =
    await serviceExperienceRepository.getServiceExperiences({
      where: { escort_id: escortId },
      select: {
        id: true,
        is_anonymous: true,
        rating: true,
        review: true,
        escort: {
          select: {
            destination: { select: { name: true } },
            created_at: true,
          },
        },
      },
    })

  if (serviceExperience.length < 1) return null
  if (serviceExperience[0].escort === null) return null

  return {
    id: serviceExperience[0].id,
    rating: serviceExperience[0].rating,
    review: serviceExperience[0].review,
    isAnonymous: serviceExperience[0].is_anonymous,
    escort: {
      destination: serviceExperience[0].escort.destination.name,
      createdAt: parseDateToHumanreadableFormat(
        serviceExperience[0].escort.created_at
      ),
    },
  } satisfies ServiceExperience
}
