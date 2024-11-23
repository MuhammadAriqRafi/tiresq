import { History, Pencil } from 'lucide-react'
import Image from 'next/image'
import getUser from '@/app/(authenticated)/account/_actions/get-user.action'
import MenuItem from '@/app/(authenticated)/account/menu-item'
import MenuItemLogout from '@/app/(authenticated)/account/menu-item-logout'
import NavigationButton from '@/components/ui/navigation-button'

export default async function AccountPage() {
  const [user] = await getUser()

  return (
    <main className="p-6">
      <section className="flex items-center gap-4">
        <NavigationButton type="BACK" />
        <h1 className="text-base font-bold">Akun Saya</h1>
      </section>

      <section className="mb-8 mt-6 flex items-center gap-4">
        <Image
          src="https://picsum.photos/id/58/64"
          alt="Profile Picture"
          width={64}
          height={64}
          className="size-16 rounded-full bg-muted-foreground"
        />
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-bold">{user?.email?.split('@')[0]}</h2>
          <p className="text-xs font-light">{user?.email}</p>
        </div>
        {/* TODO: Add update account feature */}
        <Pencil className="ml-auto size-5 stroke-muted-foreground" />
      </section>

      <section className="flex flex-col gap-6">
        <MenuItem
          name="Riwayat Perjalanan"
          description="Cek riwayat perjalanan dan perjalanan aktif kamu"
          icon={<History className="min-w-5 max-w-5" />}
          url="/histories"
        />

        <div className="space-y-2">
          <p className="text-xs font-semibold">Pengaturan</p>
          <MenuItemLogout />
        </div>
      </section>
    </main>
  )
}
