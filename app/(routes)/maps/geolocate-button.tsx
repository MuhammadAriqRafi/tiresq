import { useMap } from '@vis.gl/react-google-maps'
import { LocateFixed } from 'lucide-react'
import { useContext } from 'react'
import { UserOnProgressTripContext } from '@/routes/user-on-progress-trip-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function GeolocateButton({
  position,
}: {
  position: google.maps.LatLngLiteral
}) {
  const map = useMap()
  const userOnProgressTrip = useContext(UserOnProgressTripContext)

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        'fixed right-6 border-primary bg-transparent backdrop-blur-sm',
        {
          'bottom-24': userOnProgressTrip !== null,
          'top-6': userOnProgressTrip === null,
        }
      )}
      onClick={() => (map ? map.panTo(position) : null)}
    >
      <LocateFixed className="stroke-primary" />
    </Button>
  )
}
