'use server'

import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'
import { getInjection } from '@/src/di/container'

export const logout = createServerAction().handler(async () => {
  const authenticationsService = getInjection('IAuthenticationService')
  await authenticationsService.logout()
  redirect('/login')
})
