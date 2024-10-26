import 'server-only'
import env from '@/env'
import { getInjection } from '@/src/di/container'

export default async function extendTripExpiryPeriodUseCase({
  tripId,
}: {
  tripId: string
}) {
  const tripsRepository = getInjection('ITripsRepository')
  await tripsRepository.updateTrip(tripId, {
    expiredAt: Date.now() + env.TRIP_EXPIRY_PERIOD_IN_MILLISECONDS,
  })
}
