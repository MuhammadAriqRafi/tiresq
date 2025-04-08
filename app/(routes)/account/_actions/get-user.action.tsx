'use server'

import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'

const getUser = createServerAction().handler(async () => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.getUser()
})

export default getUser
