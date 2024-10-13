import { Star } from 'lucide-react'

export default function RatingBadge() {
  return (
    <div className="flex h-fit w-fit items-center gap-1 rounded-md border px-2 py-1 shadow-md">
      <Star className="fill-yellow-300 stroke-yellow-600" size={16} />
      <p className="text-xs font-semibold">5</p>
    </div>
  )
}
