import { nanoid } from 'nanoid'
import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import { getInjection } from '@/src/di/container'

export default async function createTripExperienceUseCase(
  {
    tripId,
  }: {
    tripId: string
  },
  trx?: PrismaTransactionalClient
) {
  const tripsRepository = getInjection('ITripsRepository')
  await tripsRepository.createTripExperience(
    {
      id: nanoid(8),
      trip: { connect: { id: tripId } },
    },
    trx
  )
}
