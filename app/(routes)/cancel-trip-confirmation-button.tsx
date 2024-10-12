import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function CancelTripConfirmationButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Ga, Batalin</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Yakin mau batalin perjalanannya?</DrawerTitle>
          <DrawerDescription>Tolong beritahu kami alasannya</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 pt-0">
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cancel" id="cancel" />
              <Label htmlFor="cancel">Saya mau ganti perjalanan baru</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="complete" id="complete" />
              <Label htmlFor="complete">Saya sudah sampai tujuan</Label>
            </div>
          </RadioGroup>
        </div>

        <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2">
          <Button
            className="border-destructive text-destructive"
            variant="outline"
          >
            Batalin
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Gajadi</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
