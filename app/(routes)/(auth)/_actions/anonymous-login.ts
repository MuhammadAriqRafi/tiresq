'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'

const AnonymousLoginInputSchema = z.object({
  captchaToken: z.string().min(1, { message: 'Captcha harus diisi' }),
})

export const anonymousLogin = createServerAction()
  .input(AnonymousLoginInputSchema)
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')
    await authenticationsService.loginAnonymously({
      captchaToken: input.captchaToken,
    })

    revalidatePath('/', 'layout')
    redirect('/')
  })
