'use client'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { Button } from '@/components/ui/button'
import findNearestTireRepairShopAction from '@/utils/actions/core/find-nearest-tire-repair-shop.action'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'
import { useUserLocation } from '@/utils/providers/user-location-provider'

export default function FindNearestTireRepairShopButton() {
  const userLocation = useUserLocation()
  const { onProgressEscort, refreshOnProgressEscort } = useOnProgressEscort()
  const { isPending, execute } = useServerAction(
    findNearestTireRepairShopAction,
    {
      onSuccess() {
        refreshOnProgressEscort()
      },
      onError({ err }) {
        toast.error('Oops...', {
          description: err.message,
        })
      },
    }
  )

  if (userLocation === null) return null
  if (onProgressEscort !== null) return null

  return (
    <Button
      onClick={async () => await execute({ origin: userLocation.coordinate })}
      className="fixed bottom-24 left-1/2 w-[calc(100%-48px)] max-w-md -translate-x-1/2"
    >
      {!isPending && 'Cari Tambal Ban'}
      {isPending && <Loader2 className="animate-spin" />}
    </Button>
  )
}
