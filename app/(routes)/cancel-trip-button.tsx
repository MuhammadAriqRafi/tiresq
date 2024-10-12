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

export default function CancelTripButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          Batalin
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Kamu mau batalin perjalanan?</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2">
          <Button
            className="border-destructive text-destructive"
            variant="outline"
          >
            Batalin
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Tidak</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
