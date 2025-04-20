'use client'

import { Loader2, LogOut } from 'lucide-react'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import MenuItem from '@/app/(routes)/account/_components/menu-item'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import logout from '@/utils/actions/auth/logout.action'

export default function MenuItemLogout() {
  const { isPending, execute } = useServerAction(logout, {
    onError({ err }) {
      toast.error('Gagal', { description: err.message })
    },
  })

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await execute()
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <section>
          <MenuItem
            name="Keluar"
            description="Kamu harus login kembali kalau mau pake fitur lengkap TiresQ."
            icon={<LogOut className="max-zw-5 min-w-5" />}
          />
        </section>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Yakin mau keluar dari aplikasi?</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2 [&>form]:w-1/2">
          <form onSubmit={handleOnSubmit}>
            <Button
              variant="destructive"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? <Loader2 className="animate-spin" /> : 'Keluar'}
            </Button>
          </form>
          <DrawerClose asChild>
            <Button variant="outline">Gajadi</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
