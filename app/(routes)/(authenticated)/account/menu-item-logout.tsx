'use client'

import { Loader2, LogOut } from 'lucide-react'
import { FormEvent } from 'react'
import { useServerAction } from 'zsa-react'
import { logout } from '@/routes/(auth)/_actions/logout'
import { Button } from '@/app/_components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/_components/ui/drawer'
import MenuItem from '@/app/(routes)/(authenticated)/account/menu-item'
import { useToast } from '@/hooks/use-toast'

export default function MenuItemLogout() {
  const { toast } = useToast()
  const { isPending, execute } = useServerAction(logout, {
    onError({ err }) {
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: err.message,
      })
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
            <Button variant="destructive" className="w-full">
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
