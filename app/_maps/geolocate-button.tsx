import { useMap } from '@vis.gl/react-google-maps'
import { LocateFixed } from 'lucide-react'
import { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { UserOnProgressTripContext } from '@/providers/user-on-progress-trip-provider'

export default function GeolocateButton({
  position,
}: {
  position: google.maps.LatLngLiteral
}) {
  const map = useMap()
  const { onProgressTrip } = useContext(UserOnProgressTripContext)

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => (map ? map.panTo(position) : null)}
      className={cn(
        'fixed right-6 border-primary bg-transparent backdrop-blur-sm',
        {
          'bottom-24': onProgressTrip !== null,
          'top-6': onProgressTrip === null,
        }
      )}
    >
      <LocateFixed className="stroke-primary" />
    </Button>
  )
}
