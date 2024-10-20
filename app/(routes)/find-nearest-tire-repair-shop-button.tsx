'use client'

import { useContext } from 'react'
import { UserDestinationContext } from '@/routes/user-destination-provider'
import { Button } from '@/components/ui/button'

export default function FindNearestTireRepairShopButton() {
  // TODO: Add findNearestTireRepairShop action here
  const userDestination = useContext(UserDestinationContext)

  if (userDestination !== null) return null

  return (
    <Button className="fixed bottom-24 left-1/2 w-[calc(100%-48px)] max-w-md -translate-x-1/2">
      {/* TODO: If finding nearest tire repair shop, display loading spinner */}
      Cari Tambal Ban
    </Button>
  )
}
