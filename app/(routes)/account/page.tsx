import { History, Pencil } from 'lucide-react'
import MenuItem from '@/routes/account/menu-item'
import MenuItemLogout from '@/routes/account/menu-item-logout'
import NavigationButton from '@/app/_components/ui/navigation-button'

export default function AccountPage() {
  return (
    <main className="p-6">
      <section className="flex items-center gap-4">
        <NavigationButton type="BACK" />
        <h1 className="text-base font-bold">Akun Saya</h1>
      </section>

      <section className="mb-8 mt-6 flex items-center gap-4">
        <div className="size-16 rounded-full bg-muted-foreground"></div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-bold">Muhammad Ariq Rafi</h2>
          <p className="text-xs font-light">mariqrafi57@gmail.com</p>
        </div>
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
