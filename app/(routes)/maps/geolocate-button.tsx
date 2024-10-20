import { useMap } from '@vis.gl/react-google-maps'
import { LocateFixed } from 'lucide-react'
import { useContext } from 'react'
import { UserDestinationContext } from '@/routes/user-destination-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function GeolocateButton({
  position,
}: {
  position: google.maps.LatLngLiteral
}) {
  const map = useMap()
  const userDestination = useContext(UserDestinationContext)

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        'fixed right-6 border-primary bg-transparent backdrop-blur-sm',
        {
          'bottom-24': userDestination !== null,
          'top-6': userDestination === null,
        }
      )}
      onClick={() => (map ? map.panTo(position) : null)}
    >
      <LocateFixed className="stroke-primary" />
    </Button>
  )
}
