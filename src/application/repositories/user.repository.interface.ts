import { User } from '@supabase/supabase-js'

export interface IUserRepository {
  getUser(): Promise<User | null>
  getUsers(): Promise<User[]>
  updateUser(input: { email: string; password: string }): Promise<void>
}
