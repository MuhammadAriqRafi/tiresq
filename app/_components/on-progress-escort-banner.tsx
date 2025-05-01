import { Footprints, Hourglass } from 'lucide-react'
import CancelEscortDrawer from '@/app/_components/cancel-escort-drawer'
import CompleteEscortDrawer from '@/app/_components/complete-escort-drawer'
import TireRepairShopDetailDialog from '@/app/_components/tire-repair-shop-detail-dialog'
import AlternativeTireRepairShops from '@/app/_components/user/alternative-tire-repair-shops'
import RatingBadge from '@/components/ui/rating-badge'
import { useDirections } from '@/utils/providers/directions-provider'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'

export default function OnProgressEscortBanner() {
  const { onProgressEscort } = useOnProgressEscort()
  const { distance, duration } = useDirections()

  if (onProgressEscort === null || onProgressEscort.isExpired) return null
  return (
    <section className="fixed left-1/2 top-0 mt-4 w-[calc(100vw-32px)] max-w-md -translate-x-1/2 space-y-4 rounded-xl border border-primary/15 bg-white px-6 py-5 shadow-md shadow-primary/10">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-base font-bold">
              {onProgressEscort.destination.name}
            </p>
            <TireRepairShopDetailDialog
              destination={onProgressEscort.destination}
            />
          </div>

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

        <RatingBadge rating={onProgressEscort.destination.rating} />
      </div>

      <div className="flex w-full gap-2 [&>button]:w-1/2">
        <CancelEscortDrawer />
        <CompleteEscortDrawer />
      </div>

      <AlternativeTireRepairShops />
    </section>
  )
}
