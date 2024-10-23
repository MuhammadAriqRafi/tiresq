import { createClient } from '@/lib/supabase/server'
import { AuthenticationError } from '@/src/entities/errors/authentication'

export default function authenticationService() {
  return {
    async loginWithPassword(input: { email: string; password: string }) {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword(input)
      if (error !== null) throw new AuthenticationError(error.message)
    },
    async register(input: { email: string; password: string }) {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp(input)
      if (error !== null) throw new AuthenticationError(error.message)
    },
    async logout() {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      if (error !== null) throw new AuthenticationError(error.message)
    },
    async getUser() {
      const supabase = createClient()
      const {
        error,
        data: { user },
      } = await supabase.auth.getUser()
      if (error !== null) console.log({ getUserError: error })
      return user
    },
  }
}
