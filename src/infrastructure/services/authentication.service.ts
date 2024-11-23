import { User } from '@supabase/supabase-js'
import { injectable } from 'inversify'
import { createClient } from '@/lib/supabase/server'
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface'
import { AuthenticationError } from '@/src/entities/errors/authentication'

@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor() {}

  async getUser(): Promise<User | null> {
    const supabase = createClient()
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser()
    if (error !== null) console.error({ getUserError: error })
    return user
  }

  async updateUser(input: { email: string; password: string }): Promise<void> {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      email: input.email,
      password: input.password,
    })

    if (error !== null) {
      console.error({ updateUserError: error })
      throw new AuthenticationError(error.message)
    }
  }

  async loginWithPassword(input: {
    email: string
    password: string
    captchaToken: string
  }) {
    const supabase = createClient()
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
    const supabase = createClient()
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
    captchaToken: string
  }) {
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options:
        process.env.NODE_ENV === 'production'
          ? { captchaToken: input.captchaToken }
          : undefined,
    })

    if (error !== null) {
      console.error({ registerError: error })
      throw new AuthenticationError(error.message)
    }
  }

  async logout() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error !== null) {
      console.error({ logoutError: error })
      throw new AuthenticationError(error.message)
    }
  }
}
