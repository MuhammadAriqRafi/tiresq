import { useState } from 'react'
import CancelEscortConfirmationForm from '@/app/_components/cancel-escort-confirmation-form'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

export default function CancelEscortConfirmationDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Batalin</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Yakin mau batalin perjalanannya?</DrawerTitle>
          <DrawerDescription>Tolong beritahu kami alasannya</DrawerDescription>
        </DrawerHeader>
        <CancelEscortConfirmationForm />
      </DrawerContent>
    </Drawer>
  )
}
