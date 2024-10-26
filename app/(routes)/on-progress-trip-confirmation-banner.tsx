'use client'

import { Footprints, MoveRight } from 'lucide-react'
import { useContext } from 'react'
import CancelTripConfirmationButton from '@/routes/cancel-trip-confirmation-button'
import ContinueTripConfirmationButton from '@/routes/continue-trip-confirmation-button'
import { UserOnProgressTripContext } from '@/routes/user-on-progress-trip-provider'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

export default function OnProgressTripConfirmationBanner() {
  const { onProgressTrip } = useContext(UserOnProgressTripContext)

  return (
    <Drawer
      dismissible={false}
      open={onProgressTrip !== null && onProgressTrip.isExpired}
    >
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
              {onProgressTrip?.destination.name}
            </p>
            <span className="text-xs">{onProgressTrip?.createdAt}</span>
            {/* <span className="text-xs">Sabtu, 8 Apr 2023, 15:00</span> */}
          </div>
        </div>

        <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2">
          <CancelTripConfirmationButton />
          <ContinueTripConfirmationButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
