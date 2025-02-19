import { useMap } from '@vis.gl/react-google-maps'
import { Loader2 } from 'lucide-react'
import { useContext, useState } from 'react'
import { useServerAction } from 'zsa-react'
import completeTrip from '@/app/_actions/complete-trip.action'
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
import { DirectionsContext } from '@/utils/providers/directions-provider'
import { UserLocationContext } from '@/utils/providers/user-location-provider'
import { UserOnProgressTripContext } from '@/utils/providers/user-on-progress-trip-provider'

export default function CompleteTripButton() {
  const map = useMap()
  const userLocation = useContext(UserLocationContext)
  const [open, setOpen] = useState(false)
  const { directionsRenderer } = useContext(DirectionsContext)
  const { onProgressTrip, setOnProgressTrip } = useContext(
    UserOnProgressTripContext
  )
  const { isPending, execute } = useServerAction(completeTrip, {
    onSuccess() {
      setOnProgressTrip(null)
      if (directionsRenderer) directionsRenderer.set('directions', null)
      if (map && userLocation) map.panTo(userLocation.coordinate)
    },
  })

  if (onProgressTrip === null) return null

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
          <Button
            variant="success"
            onClick={async () =>
              await execute({ tripId: onProgressTrip.tripId })
            }
          >
            {!isPending && 'Sampai'}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
