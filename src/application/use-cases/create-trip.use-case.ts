import { nanoid } from 'nanoid'
import 'server-only'
import env from '@/env'
import { getInjection } from '@/src/di/container'

export default async function createTripUseCase(
  {
    userId,
    destinationId,
  }: {
    userId: string
    destinationId: number
  },
  options: { checkOnProgressTripBeforeCreating: boolean } = {
    checkOnProgressTripBeforeCreating: true,
  }
) {
  const tripsRepository = getInjection('ITripsRepository')

  if (options.checkOnProgressTripBeforeCreating) {
    const onProgressTrip = await tripsRepository.getTrips({
      where: { userId, status: 'ONPROGRESS' },
      select: { id: true },
    })

    // TODO: Create custom error class
    if (onProgressTrip.length > 0)
      throw new Error('Anda sedang dalam perjalanan')
  }

  await tripsRepository.createTrip({
    id: nanoid(8),
    userId,
    destination: { connect: { id: destinationId } },
    createdAt: Date.now(),
    expiredAt: Date.now() + env.TRIP_EXPIRY_PERIOD_IN_MILLISECONDS,
  })
}
