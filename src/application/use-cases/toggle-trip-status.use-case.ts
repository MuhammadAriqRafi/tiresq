import { type TripStatus } from '@prisma/client'
import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import { getInjection } from '@/src/di/container'

export default async function toggleTripStatusUseCase(
  {
    tripId,
    status,
  }: {
    tripId: string
    status: TripStatus
  },
  trx?: PrismaTransactionalClient
) {
  const tripsRepository = getInjection('ITripsRepository')
  await tripsRepository.updateTrip(
    tripId,
    {
      status,
      cancelledAt: status === 'CANCELLED' ? Date.now() : undefined,
      completedAt: status === 'COMPLETED' ? Date.now() : undefined,
    },
    trx
  )
}
