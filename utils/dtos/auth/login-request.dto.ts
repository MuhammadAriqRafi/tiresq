import { z } from 'zod'

export const LoginRequestSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email tidak valid' })
    .min(1, { message: 'Email tidak boleh kosong' }),
  password: z.string().min(1, { message: 'Password tidak boleh kosong' }),
  captchaToken: z.string().min(1, { message: 'Captcha harus diisi' }),
})

export type LoginRequestDto = z.infer<typeof LoginRequestSchema>

export const loginRequestDefaultValue = {
  email: '',
  password: '',
  captchaToken: 'dummyCaptchaToken',
} satisfies LoginRequestDto
