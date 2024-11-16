'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'

const LoginInputSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email tidak valid' })
    .min(1, { message: 'Email tidak boleh kosong' }),
  password: z.string().min(1, { message: 'Password tidak boleh kosong' }),
  captchaToken: z.string().min(1, { message: 'Captcha harus diisi' }),
})

const login = createServerAction()
  .input(LoginInputSchema, { type: 'formData' })
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')
    await authenticationsService.loginWithPassword(input)
    revalidatePath('/', 'layout')
    redirect('/')
  })

export default login
