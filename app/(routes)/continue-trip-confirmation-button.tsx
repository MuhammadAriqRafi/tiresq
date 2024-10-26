import { Loader2 } from 'lucide-react'
import { useContext } from 'react'
import { useServerAction } from 'zsa-react'
import { continueTrip } from '@/routes/_actions/continue-trip.action'
import { UserOnProgressTripContext } from '@/routes/user-on-progress-trip-provider'
import { Button } from '@/components/ui/button'

export default function ContinueTripConfirmationButton() {
  const { onProgressTrip, setOnProgressTrip } = useContext(
    UserOnProgressTripContext
  )
  const { isPending, execute } = useServerAction(continueTrip, {
    onSuccess({ data }) {
      setOnProgressTrip(data)
    },
  })

  return (
    <Button
      onClick={async () => await execute({ tripId: onProgressTrip!.tripId })}
    >
      {!isPending && 'Lanjutin'}
      {isPending && <Loader2 className="animate-spin" />}
    </Button>
  )
}
