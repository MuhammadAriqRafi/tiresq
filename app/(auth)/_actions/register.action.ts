'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'

const RegisterInputSchema = z
  .object({
    email: z.string().email().min(1, { message: 'Email tidak boleh kosong' }),
    password: z.string().min(1, { message: 'Password tidak boleh kosong' }),
    captchaToken: z.string().min(1, { message: 'Captcha harus diisi' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Konfirmasi password tidak boleh kosong' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password tidak sama',
        path: ['confirmPassword'],
      })
    }
  })

const register = createServerAction()
  .input(RegisterInputSchema, { type: 'formData' })
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')
    const user = await authenticationsService.getUser()

    if (user && user.is_anonymous) {
      await authenticationsService.updateUser({
        email: input.email,
        password: input.password,
      })
    } else await authenticationsService.register(input)

    return redirect('/')
  })

export default register
