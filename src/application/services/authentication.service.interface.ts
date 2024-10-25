import { User } from '@supabase/supabase-js'

export interface IAuthenticationService {
  getUser(): Promise<User | null>
  loginWithPassword(input: { email: string; password: string }): Promise<void>
  register(input: { email: string; password: string }): Promise<void>
  logout(): Promise<void>
}
