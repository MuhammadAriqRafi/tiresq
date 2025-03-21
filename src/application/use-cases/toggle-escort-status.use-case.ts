import { type EscortStatus } from '@prisma/client'
import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import { getInjection } from '@/src/di/container'

export default async function toggleEscortStatusUseCase(
  {
    escortId,
    status,
  }: {
    escortId: string
    status: EscortStatus
  },
  trx?: PrismaTransactionalClient
) {
  const escortsRepository = getInjection('IEscortsRepository')
  await escortsRepository.updateEscort(
    escortId,
    {
      status,
      cancelled_at: status === 'CANCELLED' ? Date.now() : undefined,
      completed_at: status === 'COMPLETED' ? Date.now() : undefined,
    },
    trx
  )
}
