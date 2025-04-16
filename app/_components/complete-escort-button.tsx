import { useMap } from '@vis.gl/react-google-maps'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { Button } from '@/components/ui/button'
import completeEscortAction from '@/utils/actions/escorts/complete-escort.action'
import { useDirections } from '@/utils/providers/directions-provider'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'
import { useUserLocation } from '@/utils/providers/user-location-provider'

export default function CompleteEscortButton() {
  const map = useMap()
  const userLocation = useUserLocation()
  const { directionsRenderer } = useDirections()
  const { onProgressEscort, resetOnProgressEscort } = useOnProgressEscort()

  const { isPending, execute } = useServerAction(completeEscortAction, {
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
      variant="success"
      onClick={() => execute({ escortId: onProgressEscort.escortId })}
    >
      {isPending && <Loader2 className="animate-spin" />} Sampai
    </Button>
  )
}
