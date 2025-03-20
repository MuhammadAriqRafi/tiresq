import { z } from 'zod'

export const RegisterRequestSchema = z
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

export type RegisterRequestDto = z.infer<typeof RegisterRequestSchema>

export const registerRequestDefaultValue = {
  email: '',
  password: '',
  confirmPassword: '',
  captchaToken: 'dummyCaptchaToken',
} satisfies RegisterRequestDto
