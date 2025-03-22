'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useUpdateSearchParams from '@/utils/hooks/use-update-search-params'

export default function FilterByStatusSelect() {
  const { update } = useUpdateSearchParams()

  function handleOnValueChange(status: string) {
    update({ key: 'status', value: status })
  }

  return (
    <Select onValueChange={handleOnValueChange}>
      <SelectTrigger className="w-28 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
        <SelectItem value="ALL">Semua</SelectItem>
        <SelectItem value="COMPLETED">
          <span className="flex items-center gap-2">
            <StatusDot className="text-emerald-600" />
            <span className="truncate">Selesai</span>
          </span>
        </SelectItem>
        <SelectItem value="CANCELLED">
          <span className="flex items-center gap-2">
            <StatusDot className="text-red-500" />
            <span className="truncate">Batal</span>
          </span>
        </SelectItem>
        <SelectItem value="ONPROGRESS">
          <span className="flex items-center gap-2">
            <StatusDot className="text-amber-500" />
            <span className="truncate">Berlangsung</span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

function StatusDot({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  )
}
