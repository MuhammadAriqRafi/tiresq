import getUserAction from '@/app/(routes)/account/_actions/get-user.action'
import OwnerHomePage from '@/app/_components/owner-home-page'
import UserHomePage from '@/app/_components/user-home-page'
import { isOwner, isUser } from '@/utils/utils/auth.util'

export default async function Home() {
  const [user] = await getUserAction()

  return (
    <main className="h-dvh">
      {isUser(user) && <UserHomePage />}
      {isOwner(user) && <OwnerHomePage />}
    </main>
  )
}
