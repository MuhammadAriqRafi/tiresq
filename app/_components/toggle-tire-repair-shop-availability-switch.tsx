'use client'

import { useId } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { Switch } from '@/components/ui/switch'
import toggleTireRepairShopAvailabilityAction from '@/utils/actions/tire-repair-shops/toggle-tire-repair-shop-availability.action'

export default function ToggleTireRepairShopAvailabilitySwitch({
  isOpen,
  tireRepairShopId,
}: {
  isOpen: boolean
  tireRepairShopId: string
}) {
  const id = useId()
  const { isPending, execute } = useServerAction(
    toggleTireRepairShopAvailabilityAction,
    {
      onSuccess({ data }) {
        toast.success('Berhasil', { description: data.message })
      },
    }
  )

  return (
    <div
      className="group inline-flex items-center gap-2"
      data-state={isOpen ? 'checked' : 'unchecked'}
    >
      <span
        id={`${id}-off`}
        className="flex-1 cursor-pointer text-right text-xs font-medium group-data-[state=checked]:text-muted-foreground/70"
        aria-controls={id}
        onClick={() => execute({ isOpen: false, tireRepairShopId })}
      >
        Tutup
      </span>
      <Switch
        id={id}
        checked={isOpen}
        disabled={isPending}
        aria-labelledby={`${id}-off ${id}-on`}
      />
      <span
        id={`${id}-on`}
        className="flex-1 cursor-pointer text-left text-xs font-medium group-data-[state=checked]:text-primary group-data-[state=unchecked]:text-muted-foreground/70"
        aria-controls={id}
        onClick={() => execute({ isOpen: true, tireRepairShopId })}
      >
        Buka
      </span>
    </div>
  )
}
