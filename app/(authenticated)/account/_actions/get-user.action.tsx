'use server'

import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'

const getUser = createServerAction().handler(async () => {
  const authenticationsService = getInjection('IAuthenticationService')
  return await authenticationsService.getUser()
})

export default getUser
