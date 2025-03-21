import { useState } from 'react'
import CompleteEscortButton from '@/app/_components/complete-escort-button'
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

export default function CompleteEscortDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Sampai</Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby="">
        <DrawerHeader>
          <DrawerTitle>Yay, kamu sudah sampai tujuan?</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2">
          <DrawerClose asChild>
            <Button variant="outline">Belum</Button>
          </DrawerClose>
          <CompleteEscortButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
