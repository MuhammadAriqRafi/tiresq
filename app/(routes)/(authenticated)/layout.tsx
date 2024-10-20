import { redirect } from 'next/navigation'
import authenticationService from '@/src/infrastructure/services/authentication.service'

export default async function AuthenticatedLayout({ children }: LayoutProps) {
  const user = await authenticationService().getUser()
  if (user === null) return redirect('/login')
  return <>{children}</>
}
