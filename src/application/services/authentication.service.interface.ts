import { User } from '@supabase/supabase-js'

export interface IAuthenticationService {
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

  resetPasswordForEmail(email: string): Promise<void>

  registerOwner(input: { email: string; password: string }): Promise<User>

  logout(): Promise<void>
}
