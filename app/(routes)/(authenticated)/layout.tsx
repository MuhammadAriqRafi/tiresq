import { redirect } from 'next/navigation'
import { getInjection } from '@/src/di/container'

export default async function AuthenticatedLayout({ children }: LayoutProps) {
  const user = await getInjection('IAuthenticationService').getUser()
  if (user === null) return redirect('/login')
  return <>{children}</>
}
