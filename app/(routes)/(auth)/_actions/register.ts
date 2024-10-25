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

export const register = createServerAction()
  .input(RegisterInputSchema, { type: 'formData' })
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')
    await authenticationsService.register(input)
    redirect('/login')
  })
