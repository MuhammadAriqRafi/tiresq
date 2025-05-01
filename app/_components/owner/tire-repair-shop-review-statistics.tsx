import { Star } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function TireRepairShopReviewStatistics({
  rating,
  numberOfVisits,
  numberOfEachStar,
}: {
  rating: number
  numberOfVisits: number
  numberOfEachStar: number[]
}) {
  return (
    <div className="flex items-center gap-x-10 border-b border-b-muted-foreground px-4 pb-3">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Star className="fill-yellow-300 stroke-yellow-600" size={16} />
          <p className="font-semibold">{rating}</p>
        </div>
        <p className="w-max text-xs font-normal text-muted-foreground">
          {numberOfVisits} rating
        </p>
      </div>

      <div className="w-full">
        {[1, 2, 3, 4, 5].map((number, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-[10px] font-light">{number}</span>
            <Progress
              max={numberOfVisits > 0 ? numberOfVisits : undefined}
              value={numberOfEachStar[index]}
              className="h-1"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
