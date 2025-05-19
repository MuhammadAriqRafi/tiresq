'use server'

import { createServerAction } from 'zsa'
import { createClient } from '@/lib/supabase/server'
import { AuthenticationError } from '@/src/entities/errors/authentication'
import { ResetPasswordRequestSchema } from '@/utils/dtos/auth/reset-password-request.dto'

const resetPasswordAction = createServerAction()
  .input(ResetPasswordRequestSchema)
  .handler(async ({ input }) => {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(input.resetCode)
    const { error } = await supabase.auth.updateUser({
      password: input.password,
    })

    if (error !== null) {
      console.error({ updateUserError: error })
      throw new AuthenticationError(error.message)
    }

    return {
      message: 'Password berhasil diubah, kamu akan diarahkan ke halaman login',
    }
  })

export default resetPasswordAction
