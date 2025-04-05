import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import { generateId } from '@/lib/utils'
import env from '@/env'
import { getInjection } from '@/src/di/container'
import { RestrictedActionError } from '@/src/entities/errors/common'

export default async function createEscortUseCase(
  {
    userId,
    destinationId,
    destinationName,
  }: {
    userId: string
    destinationId: string
    destinationName: string
  },
  options: {
    checkHasOnProgressTripBeforeCreating: boolean
    trx?: PrismaTransactionalClient
  } = {
    checkHasOnProgressTripBeforeCreating: true,
  }
) {
  const escortsRepository = getInjection('IEscortsRepository')

  if (options.checkHasOnProgressTripBeforeCreating) {
    const onProgressTrip = await escortsRepository.getEscorts(
      {
        where: { userId, status: 'ONPROGRESS' },
        select: { id: true },
      },
      options.trx
    )

    if (onProgressTrip.length > 0)
      throw new RestrictedActionError('Anda sedang dalam perjalanan')
  }

  await escortsRepository.createEscort(
    {
      id: generateId('ESC'),
      user_id: userId,
      destination: { connect: { id: destinationId } },
      destination_name: destinationName,
      created_at: Date.now(),
      expired_at: Date.now() + env.ESCORT_EXPIRY_PERIOD_IN_MILLISECONDS,
    },
    options.trx
  )
}
