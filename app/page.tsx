import getUserAction from '@/app/(routes)/account/_actions/get-user.action'
import OwnerHomePage from '@/app/_components/owner-home-page'
import SuperadminHomePage from '@/app/_components/superadmin/superadmin-home-page'
import UserHomePage from '@/app/_components/user-home-page'
import { isOwner, isSuperadmin, isUser } from '@/utils/utils/auth.util'

export default async function Home() {
  const [user] = await getUserAction()

  return (
    <main className="h-dvh">
      {isUser(user) && <UserHomePage />}
      {isOwner(user) && <OwnerHomePage />}
      {isSuperadmin(user) && <SuperadminHomePage />}
    </main>
  )
}
