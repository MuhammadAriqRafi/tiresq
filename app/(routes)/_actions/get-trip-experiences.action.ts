'use server'

import getTripExperiencesUseCase from '@/src/application/use-cases/get-trip-experiences.use-case'
import { getInjection } from '@/src/di/container'
import { AuthenticationError } from '@/src/entities/errors/authentication'

export default async function getTripExperiences({
  tripId,
}: {
  tripId: string
}) {
  const authenticationService = getInjection('IAuthenticationService')
  const user = await authenticationService.getUser()

  if (user === null)
    throw new AuthenticationError('Anda harus login terlebih dahulu')

  return getTripExperiencesUseCase({ tripId })
}
