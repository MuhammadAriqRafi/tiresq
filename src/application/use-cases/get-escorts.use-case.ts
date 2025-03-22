import { EscortStatus } from '@prisma/client'
import 'server-only'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'
import { parseDateToHumanreadableFormat } from '@/lib/utils'
import { getInjection } from '@/src/di/container'

export default async function getEscortsUseCase(
  userId: string,
  {
    status,
    createdAt,
  }: {
    status?: EscortStatus
    createdAt?: number
  }
) {
  const escortsRepository = getInjection('IEscortsRepository')
  const escorts = await escortsRepository.getEscorts({
    where: {
      status,
      user_id: userId,
      created_at: { lt: createdAt },
    },
    select: {
      id: true,
      status: true,
      created_at: true,
      destination: { select: { name: true } },
      service_experience: { select: { rating: true, review: true } },
    },
    take: DEFAULT_PAGE_SIZE,
    orderBy: { created_at: 'desc' },
  })

  if (escorts.length < 1) return null
  return escorts.map((escort) => ({
    id: escort.id,
    name: escort.destination.name,
    rating:
      escort.service_experience !== null
        ? escort.service_experience.rating
        : null,
    review:
      escort.service_experience !== null
        ? escort.service_experience.review
        : null,
    status: escort.status,
    isExpired: false,
    createdAt: parseDateToHumanreadableFormat(escort.created_at),
    createdAtRaw: Number(escort.created_at),
  })) satisfies EscortHistories
}
