'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'

const LoginInputSchema = z.object({
  email: z.string().email().min(1, { message: 'Email tidak boleh kosong' }),
  password: z.string().min(1),
})

export const login = createServerAction()
  .input(LoginInputSchema, { type: 'formData' })
  .handler(async ({ input }) => {
    console.log({ input })
    return { message: 'Berhasil' }
  })
