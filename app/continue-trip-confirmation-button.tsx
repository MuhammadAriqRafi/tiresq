import { Loader2 } from 'lucide-react'
import { useContext } from 'react'
import { useServerAction } from 'zsa-react'
import continueTrip from '@/app/_actions/continue-trip.action'
import { Button } from '@/components/ui/button'
import { UserOnProgressTripContext } from '@/providers/user-on-progress-trip-provider'

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
