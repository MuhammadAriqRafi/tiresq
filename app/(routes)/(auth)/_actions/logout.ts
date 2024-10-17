'use server'

import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'
import authenticationService from '@/src/infrastructure/services/authentication.service'

export const logout = createServerAction().handler(async () => {
  const authenticationsService = authenticationService()
  await authenticationsService.logout()
  redirect('/login')
})
