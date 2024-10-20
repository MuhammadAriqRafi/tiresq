import { Footprints, Hourglass } from 'lucide-react'
import CancelTripButton from '@/routes/cancel-trip-button'
import CompleteTripButton from '@/routes/complete-trip-button'
import RatingBadge from '@/components/ui/rating-badge'

export default function OnProgressTripBanner() {
  return (
    <section className="fixed max-w-md bg-white border-secondary border top-0 w-[calc(100vw-32px)] left-1/2 -translate-x-1/2 mt-4 rounded-xl space-y-4 px-6 py-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-base font-bold">Tambal Ban Asep</p>

          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Footprints size={14} />
              <p className="text-xs">5.5 Km</p>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Hourglass size={14} />
              <p className="text-xs">5.5 Km</p>
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
