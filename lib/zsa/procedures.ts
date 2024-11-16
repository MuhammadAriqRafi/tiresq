import { createServerActionProcedure } from 'zsa'
import { getInjection } from '@/src/di/container'
import { AuthenticationError } from '@/src/entities/errors/authentication'

export const authenticatedProcedure = createServerActionProcedure().handler(
  async () => {
    const authenticationService = getInjection('IAuthenticationService')
    const user = await authenticationService.getUser()

    if (user === null)
      throw new AuthenticationError('Anda harus login terlebih dahulu')

    return { user }
  }
)
