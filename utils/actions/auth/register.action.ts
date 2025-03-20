'use server'

import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'
import { RegisterRequestSchema } from '@/utils/dtos/auth/register-request.dto'

const registerAction = createServerAction()
  .input(RegisterRequestSchema)
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')
    const user = await authenticationsService.getUser()

    if (user && user.is_anonymous) {
      await authenticationsService.updateUser({
        email: input.email,
        password: input.password,
      })
    } else await authenticationsService.register(input)

    return { message: 'Registrasi berhasil!' }
  })

export default registerAction
