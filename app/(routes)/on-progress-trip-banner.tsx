import { Footprints, Hourglass } from 'lucide-react'
import { useContext } from 'react'
import CancelTripButton from '@/routes/cancel-trip-button'
import CompleteTripButton from '@/routes/complete-trip-button'
import { DirectionsContext } from '@/routes/maps/directions-provider'
import { UserOnProgressTripContext } from '@/routes/user-on-progress-trip-provider'
import RatingBadge from '@/components/ui/rating-badge'

export default function OnProgressTripBanner() {
  const { onProgressTrip } = useContext(UserOnProgressTripContext)
  const { distance, duration } = useContext(DirectionsContext)
  if (onProgressTrip === null) return null

  return (
    <section className="fixed left-1/2 top-0 mt-4 w-[calc(100vw-32px)] max-w-md -translate-x-1/2 space-y-4 rounded-xl border border-secondary bg-white px-6 py-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-base font-bold">
            {onProgressTrip.destination.name}
          </p>

          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Footprints size={14} />
              <p className="text-xs">{distance}</p>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Hourglass size={14} />
              <p className="text-xs">{duration}</p>
            </div>
          </div>
        </div>

        <RatingBadge />
      </div>

      <div className="flex w-full gap-2 [&>button]:w-1/2">
        <CancelTripButton />
        <CompleteTripButton />
      </div>
    </section>
  )
}
