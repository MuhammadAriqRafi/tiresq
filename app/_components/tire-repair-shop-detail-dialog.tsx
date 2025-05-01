'use client'

import { Info } from 'lucide-react'
import { capitalize, cn } from '@/lib/utils'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import RatingBadge from '@/components/ui/rating-badge'

export default function TireRepairShopDetailDialog({
  destination,
}: {
  destination: OnProgressEscort['destination']
}) {
  const currentDay = getCurrentDay()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Info className="size-4" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-2 p-6">
          <div className="flex items-center gap-4">
            <RatingBadge rating={destination.rating} />
            <DrawerTitle>{destination.name}</DrawerTitle>
          </div>
        </DrawerHeader>
        <div className="space-y-6 px-6 pb-6">
          <div className="flex flex-col">
            <p className="font-semibold">
              Rp{' '}
              {new Intl.NumberFormat('id-ID', {
                maximumFractionDigits: 0,
              }).format(destination.serviceCostInRupiah)}
            </p>
            <span className="text-xs font-light">Biaya Layanan Tambal Ban</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Jam Operasional</p>
            <p>{}</p>
            <div className="space-y-1">
              {destination.operatingHours.map((operatingHour) => (
                <div
                  key={operatingHour.daysOfWeek}
                  className={cn(
                    'flex items-center justify-between text-sm font-light',
                    capitalize(operatingHour.daysOfWeek) === currentDay &&
                      'font-semibold'
                  )}
                >
                  <p>{capitalize(operatingHour.daysOfWeek)}</p>
                  <span>
                    {operatingHour.isHoliday && 'Libur'}
                    {!operatingHour.isHoliday &&
                      `${operatingHour.openTime} — ${operatingHour.closeTime}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function getCurrentDay() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' })
}
