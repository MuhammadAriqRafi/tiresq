'use client'

import { Footprints, MoveRight } from 'lucide-react'
import CancelEscortConfirmationDrawer from '@/app/_components/cancel-escort-confirmation-drawer'
import ContinueEscortConfirmationButton from '@/app/_components/continue-escort-confirmation-button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'

// TODO: Check if the user current location and the on progress trip destination distance is beyond 5 km, if so, consider the trip as cancelled, otherwise continue

export default function OnProgressEscortConfirmationBanner() {
  const { onProgressEscort } = useOnProgressEscort()

  if (onProgressEscort === null) return null
  return (
    <Drawer open={onProgressEscort.isExpired} dismissible={false}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Mau lanjutin perjalan?</DrawerTitle>
          <DrawerDescription>
            Sepertinya kamu masih ada perjalanan yang belum selesai, apakah
            informasi ini masih relevan?
          </DrawerDescription>
        </DrawerHeader>

        <div className="m-4 mt-1 flex items-center justify-center gap-6 rounded-md border px-6 py-3">
          <div className="flex items-center gap-6 text-muted-foreground">
            <Footprints size={36} strokeWidth={1} />
            <MoveRight strokeWidth={1} />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-black">
              {onProgressEscort.destination.name}
            </p>
            <span className="text-xs">{onProgressEscort.createdAt}</span>
          </div>
        </div>

        <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2">
          <CancelEscortConfirmationDrawer />
          <ContinueEscortConfirmationButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
