import { z } from 'zod'

export const ForgotPasswordRequestSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email tidak valid' })
    .min(1, { message: 'Email tidak boleh kosong' }),
})

export type ForgotPasswordRequestDto = z.infer<
  typeof ForgotPasswordRequestSchema
>

export const forgotPasswordRequestDefaultValue = {
  email: '',
} satisfies ForgotPasswordRequestDto
