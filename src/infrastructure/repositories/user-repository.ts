import { User } from '@supabase/supabase-js'
import { injectable } from 'inversify'
import { createClient } from '@/lib/supabase/server'
import { IUserRepository } from '@/src/application/repositories/user.repository.interface'
import { AuthenticationError } from '@/src/entities/errors/authentication'

@injectable()
export class UserRepository implements IUserRepository {
  async getUsers(): Promise<User[]> {
    const supabase = await createClient()
    const {
      error,
      data: { users },
    } = await supabase.auth.admin.listUsers()
    if (error !== null) console.error({ getUserError: error })
    return users
  }

  async getUser(): Promise<User | null> {
    const supabase = await createClient()
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser()
    if (error !== null) console.error({ getUserError: error })
    return user
  }

  async updateUser(input: { email: string; password: string }): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase.auth.updateUser({
      email: input.email,
      password: input.password,
      data: { role: 'user' },
    })

    if (error !== null) {
      console.error({ updateUserError: error })
      throw new AuthenticationError(error.message)
    }
  }
}
