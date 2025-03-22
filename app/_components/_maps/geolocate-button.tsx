import { useMap } from '@vis.gl/react-google-maps'
import { LocateFixed } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'

export default function GeolocateButton({
  position,
}: {
  position: google.maps.LatLngLiteral
}) {
  const map = useMap()
  const { onProgressEscort } = useOnProgressEscort()

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => (map ? map.panTo(position) : null)}
      className={cn(
        'fixed right-6 border-primary bg-transparent backdrop-blur-sm hover:border-2 hover:bg-transparent',
        {
          'bottom-24': onProgressEscort !== null,
          'top-6': onProgressEscort === null,
        }
      )}
    >
      <LocateFixed className="stroke-primary" />
    </Button>
  )
}
