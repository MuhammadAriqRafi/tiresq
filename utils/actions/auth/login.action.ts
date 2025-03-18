'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'
import { LoginRequestSchema } from '@/utils/dtos/auth/login-request.dto'

const loginAction = createServerAction()
  .input(LoginRequestSchema)
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')
    await authenticationsService.loginWithPassword(input)
    revalidatePath('/', 'layout')
    redirect('/')
  })

export default loginAction
