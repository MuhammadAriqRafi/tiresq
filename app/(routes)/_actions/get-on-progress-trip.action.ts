'use server'

import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-trip.use-case'
import { getInjection } from '@/src/di/container'
import { AuthenticationError } from '@/src/entities/errors/authentication'

export default async function getOnProgressTrip() {
  const authenticationService = getInjection('IAuthenticationService')
  const user = await authenticationService.getUser()

  if (user === null)
    throw new AuthenticationError('Anda harus login terlebih dahulu')

  const onProgressTrip = await getOnProgressTripUseCase({ userId: user.id })

  if (onProgressTrip === null)
    console.warn(`User ${user.id} - Anda sedang tidak dalam perjalanan`)

  return onProgressTrip
}
