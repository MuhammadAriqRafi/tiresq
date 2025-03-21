import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import { parseDateToHumanreadableFormat } from '@/lib/utils'
import { getInjection } from '@/src/di/container'

export default async function getOnProgressEscortUseCase(
  {
    userId,
  }: {
    userId: string
  },
  trx?: PrismaTransactionalClient
) {
  const escortsRepository = getInjection('IEscortsRepository')
  const onProgressEscort = await escortsRepository.getEscorts(
    {
      where: { user_id: userId, status: 'ONPROGRESS' },
      select: {
        id: true,
        status: true,
        created_at: true,
        expired_at: true,
        destination: {
          select: {
            name: true,
            rating: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    },
    trx
  )

  if (onProgressEscort.length < 1) return null

  return {
    escortId: onProgressEscort[0].id,
    status: onProgressEscort[0].status,
    createdAt: parseDateToHumanreadableFormat(onProgressEscort[0].created_at),
    isExpired: Date.now() > onProgressEscort[0].expired_at,
    destination: {
      coordinate: {
        latitude: onProgressEscort[0].destination.latitude,
        longitude: onProgressEscort[0].destination.longitude,
      },
      name: onProgressEscort[0].destination.name,
      rating: onProgressEscort[0].destination.rating.toNumber(),
    },
  } satisfies OnProgressEscort
}
