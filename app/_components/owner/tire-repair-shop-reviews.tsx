import RatingBadge from '@/components/ui/rating-badge'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function TireRepairShopReviews({
  reviews,
}: {
  reviews: Visit[]
}) {
  return (
    <ScrollArea className="h-40">
      <div className="space-y-4">
        {reviews.length < 1 && (
          <p className="text-center text-xs font-medium text-muted-foreground">
            Kamu masih belum ada review ni
          </p>
        )}

        {reviews.length > 0 &&
          reviews.map((review, index) => {
            if (review.review !== null)
              return <ReviewItem key={index} {...review} />
          })}
      </div>
    </ScrollArea>
  )
}

function ReviewItem({ rating, review, userName, visitAt }: Visit) {
  return (
    <div className="space-y-3 border-b border-dashed pb-4 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="min-h-8 min-w-8 rounded-full bg-muted"></div>
          <div className="flex flex-col">
            <p className="text-ellipsis text-xs font-semibold">{userName}</p>
            <span className="text-xs font-normal text-muted-foreground">
              Kunjungan pada {visitAt}
            </span>
          </div>
        </div>

        <RatingBadge rating={rating!} />
      </div>

      <div className="rounded-md border p-3">
        <p className="text-xs">{review}</p>
      </div>
    </div>
  )
}
