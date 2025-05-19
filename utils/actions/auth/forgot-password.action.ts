'use server'

import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'
import { ForgotPasswordRequestSchema } from '@/utils/dtos/auth/forgot-password-request.dto'

const forgotPasswordAction = createServerAction()
  .input(ForgotPasswordRequestSchema)
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')
    await authenticationsService.resetPasswordForEmail(input.email)
    return {
      message:
        'Silahkan cek email kamu! kami sudah mengirim link reset password kamu',
    }
  })

export default forgotPasswordAction
