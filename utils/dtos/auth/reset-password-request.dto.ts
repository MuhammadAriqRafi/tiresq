import { z } from 'zod'

export const ResetPasswordRequestSchema = z
  .object({
    resetCode: z.string().min(1),
    password: z.string().min(1, { message: 'Password tidak boleh kosong' }),
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

export type ResetPasswordRequestDto = z.infer<typeof ResetPasswordRequestSchema>

export const resetPasswordRequestDefaultValue = {
  resetCode: '',
  password: '',
  confirmPassword: '',
} satisfies ResetPasswordRequestDto
