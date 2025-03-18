import { z } from 'zod'

export const LoginAnonymousRequestSchema = z.object({
  captchaToken: z.string().min(1, { message: 'Captcha harus diisi' }),
})
