import { useMap } from '@vis.gl/react-google-maps'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { Button } from '@/components/ui/button'
import cancelEscortAction from '@/utils/actions/escorts/cancel-escort.action'
import { useDirections } from '@/utils/providers/directions-provider'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'
import { useUserLocation } from '@/utils/providers/user-location-provider'

export default function CancelEscortButton() {
  const map = useMap()
  const userLocation = useUserLocation()
  const { directionsRenderer } = useDirections()
  const { onProgressEscort, resetOnProgressEscort } = useOnProgressEscort()

  const { isPending, execute } = useServerAction(cancelEscortAction, {
    onSuccess({ data }) {
      toast.success('Berhasil', { description: data.message })
      if (directionsRenderer) directionsRenderer.set('directions', null)
      if (map && userLocation) map.panTo(userLocation.coordinate)
      resetOnProgressEscort()
    },
  })

  if (onProgressEscort === null) return null
  return (
    <Button
      disabled={isPending}
      onClick={() => execute({ escortId: onProgressEscort.escortId })}
      variant="outline"
      className="border-destructive text-destructive hover:bg-background hover:text-destructive"
    >
      {isPending && <Loader2 className="animate-spin" />} Batalin
    </Button>
  )
}
