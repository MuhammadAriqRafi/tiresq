import { createServerActionProcedure } from 'zsa'
import { getInjection } from '@/src/di/container'
import { AuthenticationError } from '@/src/entities/errors/authentication'

export const authenticatedProcedure = createServerActionProcedure().handler(
  async () => {
    const userRepository = getInjection('IUserRepository')
    const user = await userRepository.getUser()

    if (user === null)
      throw new AuthenticationError('Anda harus login terlebih dahulu')

    return { user }
  }
)
