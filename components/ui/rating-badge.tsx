import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="flex h-fit w-fit items-center gap-1 rounded-md border px-2 py-1 shadow-md">
      <Star className="fill-yellow-300 stroke-yellow-600" size={16} />
      <p
        className={cn('text-xs font-semibold', {
          'text-muted-foreground': rating === 0,
        })}
      >
        {rating === 0 ? 'N/A' : rating}
      </p>
    </div>
  )
}
