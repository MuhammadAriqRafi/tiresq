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
      <SelectTrigger className="w-28">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">Semua</SelectItem>
        <SelectItem value="COMPLETED">Selesai</SelectItem>
        <SelectItem value="CANCELLED">Batal</SelectItem>
        <SelectItem value="ONPROGRESS">Berlangsung</SelectItem>
      </SelectContent>
    </Select>
  )
}
