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
    if (error !== null) console.log({ getUserError: error })
    return user
  }

  async loginWithPassword(input: { email: string; password: string }) {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(input)
    if (error !== null) throw new AuthenticationError(error.message)
  }

  async register(input: { email: string; password: string }) {
    const supabase = createClient()
    const { error } = await supabase.auth.signUp(input)
    if (error !== null) throw new AuthenticationError(error.message)
  }

  async logout() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error !== null) throw new AuthenticationError(error.message)
  }
}
