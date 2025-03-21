import { useState } from 'react'
import CancelEscortButton from '@/app/_components/cancel-escort-button'
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

export default function CancelEscortDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Batalin</Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby="">
        <DrawerHeader>
          <DrawerTitle>Kamu mau batalin perjalanan?</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2">
          <CancelEscortButton />
          <DrawerClose asChild>
            <Button variant="outline">Tidak</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
