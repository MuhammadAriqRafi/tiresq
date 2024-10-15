import { ChevronRight, History, LogOut, Pencil } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
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
          <MenuItem
            name="Keluar"
            description="Kamu harus login kembali kalau mau pake fitur lengkap TiresQ."
            icon={<LogOut className="min-w-5 max-w-5" />}
            url="#"
          />
        </div>
      </section>
    </main>
  )
}

function MenuItem({
  name,
  description,
  icon,
  url,
}: {
  name: string
  description: string
  icon: ReactNode
  url: string
}) {
  return (
    <Link href={url}>
      <div className="flex space-x-3 border-b py-2 text-muted-foreground">
        {icon}
        <div className="flex flex-col gap-0.5 text-black">
          <p className="text-sm font-semibold">{name}</p>
          <span className="text-xs font-light">{description}</span>
        </div>
        <ChevronRight className="ml-auto min-w-5 max-w-5" />
      </div>
    </Link>
  )
}
