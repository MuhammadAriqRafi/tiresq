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

export default function CompleteTripButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Sampai</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Yay, kamu sudah sampai tujuan?</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2">
          <DrawerClose asChild>
            <Button variant="outline">Belum</Button>
          </DrawerClose>
          <Button variant="success">Sampai</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
