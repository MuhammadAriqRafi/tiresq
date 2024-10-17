import { redirect } from 'next/navigation'
import authenticationService from '@/src/infrastructure/services/authentication.service'

export default async function AuthLayout({ children }: LayoutProps) {
  const user = await authenticationService().getUser()
  if (user !== null) return redirect('/')
  return <>{children}</>
}
