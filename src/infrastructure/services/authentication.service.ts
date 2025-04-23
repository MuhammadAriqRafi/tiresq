import { injectable } from 'inversify'
import { adminAuthClient, createClient } from '@/lib/supabase/server'
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface'
import { AuthenticationError } from '@/src/entities/errors/authentication'

@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor() {}

  async loginWithPassword(input: {
    email: string
    password: string
    captchaToken: string
  }) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
      options:
        process.env.NODE_ENV === 'production'
          ? { captchaToken: input.captchaToken }
          : undefined,
    })

    if (error !== null) {
      console.error({ loginWithPasswordError: error })
      throw new AuthenticationError(error.message)
    }
  }

  async loginAnonymously(input: { captchaToken: string }): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInAnonymously({
      options:
        process.env.NODE_ENV === 'production'
          ? { captchaToken: input.captchaToken }
          : undefined,
    })

    if (error !== null) {
      console.error({ loginAnonymouslyError: error })
      throw new AuthenticationError(error.message)
    }
  }

  async register(input: {
    email: string
    password: string
    captchaToken?: string
  }) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        captchaToken: input.captchaToken,
        data: { role: 'user' },
      },
    })

    if (error !== null) {
      console.error({ registerError: error })
      throw new AuthenticationError(error.message)
    }
  }

  async registerOwner(input: { email: string; password: string }) {
    const { data, error } = await adminAuthClient.createUser({
      email: input.email,
      password: input.password,
      email_confirm: true,
      user_metadata: { role: 'owner' },
    })

    if (error !== null) {
      console.error({ registerOwnerError: error })
      throw new AuthenticationError(error.message)
    }

    return data.user
  }

  async logout() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error !== null) {
      console.error({ logoutError: error })
      throw new AuthenticationError(error.message)
    }
  }
}
