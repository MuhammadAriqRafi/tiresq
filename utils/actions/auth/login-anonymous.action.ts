'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'
import { LoginAnonymousRequestSchema } from '@/utils/dtos/auth/login-anonymous-request.dto'

const loginAnonymousAction = createServerAction()
  .input(LoginAnonymousRequestSchema)
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')
    await authenticationsService.loginAnonymously({
      captchaToken: input.captchaToken,
    })
    revalidatePath('/', 'layout')
    redirect('/')
  })

export default loginAnonymousAction
