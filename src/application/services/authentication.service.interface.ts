import { User } from '@supabase/supabase-js'

export interface IAuthenticationService {
  getUser(): Promise<User | null>
  loginAnonymously(input: { captchaToken: string }): Promise<void>
  loginWithPassword(input: {
    email: string
    password: string
    captchaToken: string
  }): Promise<void>
  register(input: {
    email: string
    password: string
    captchaToken: string
  }): Promise<void>
  logout(): Promise<void>
}
