import { redirect } from 'next/navigation'
import { getInjection } from '@/src/di/container'

export default async function AuthLayout({ children }: LayoutProps) {
  const user = await getInjection('IAuthenticationService').getUser()
  if (user !== null) return redirect('/')
  return <>{children}</>
}
