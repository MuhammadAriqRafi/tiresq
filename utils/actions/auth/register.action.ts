'use server'

import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'
import { RegisterRequestSchema } from '@/utils/dtos/auth/register-request.dto'

const registerAction = createServerAction()
  .input(RegisterRequestSchema)
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')
    const userRepository = getInjection('IUserRepository')
    const user = await userRepository.getUser()

    if (user && user.is_anonymous) {
      await userRepository.updateUser({
        email: input.email,
        password: input.password,
      })
    } else await authenticationsService.register(input)

    return { message: 'Registrasi berhasil!' }
  })

export default registerAction
