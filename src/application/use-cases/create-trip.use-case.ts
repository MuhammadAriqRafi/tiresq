import { customAlphabet } from 'nanoid'
import 'server-only'
import env from '@/env'
import { getInjection } from '@/src/di/container'
import { RestrictedActionError } from '@/src/entities/errors/common'

export default async function createTripUseCase(
  {
    userId,
    destinationId,
  }: {
    userId: string
    destinationId: number
  },
  options: { checkHasOnProgressTripBeforeCreating: boolean } = {
    checkHasOnProgressTripBeforeCreating: true,
  }
) {
  const tripsRepository = getInjection('ITripsRepository')

  if (options.checkHasOnProgressTripBeforeCreating) {
    const onProgressTrip = await tripsRepository.getTrips({
      where: { userId, status: 'ONPROGRESS' },
      select: { id: true },
    })

    if (onProgressTrip.length > 0)
      throw new RestrictedActionError('Anda sedang dalam perjalanan')
  }

  await tripsRepository.createTrip({
    id: customAlphabet(
      '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      8
    )(),
    userId,
    destination: { connect: { id: destinationId } },
    createdAt: Date.now(),
    expiredAt: Date.now() + env.TRIP_EXPIRY_PERIOD_IN_MILLISECONDS,
  })
}
