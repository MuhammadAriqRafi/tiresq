'use client';

import { Loader2 } from 'lucide-react'
import { useContext } from 'react'
import { useServerAction } from 'zsa-react'
import { findNearestTireRepairShop } from '@/routes/_actions/find-nearest-tire-repair-shop.action'
import { UserLocationContext } from '@/routes/user-location-provider'
import { UserOnProgressTripContext } from '@/routes/user-on-progress-trip-provider'
import { Button } from '@/components/ui/button'

export default function FindNearestTireRepairShopButton() {
  const userLocation = useContext(UserLocationContext)
  const { onProgressTrip, setOnProgressTrip } = useContext(
    UserOnProgressTripContext
  )
  const { isPending, execute } = useServerAction(findNearestTireRepairShop, {
    onSuccess({ data }) {
      setOnProgressTrip(data)
    },
  })

  if (userLocation === null) return null
  if (onProgressTrip !== null) return null

  return (
    <Button
      onClick={async () => await execute({ origin: userLocation.coordinate })}
      className="fixed bottom-24 left-1/2 w-[calc(100%-48px)] max-w-md -translate-x-1/2"
    >
      {!isPending && 'Cari Tambal Ban'}
      {isPending && <Loader2 className='animate-spin' />}
    </Button>
  )
}