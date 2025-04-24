import { ChevronRight, MapPin } from 'lucide-react'
import { ReactNode } from 'react'
import { capitalize } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function TireRepairShopDetail({
  serviceCostInRupiah,
  operatingHours,
}: {
  serviceCostInRupiah: number
  operatingHours: OperatingHour[]
}) {
  return (
    <ScrollArea className="h-[calc(100dvh-355px)]">
      <div className="grid grid-cols-2 gap-3">
        <DetailCard
          icon="IDR"
          label="Biaya Tambal Ban"
          value={`IDR ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(serviceCostInRupiah)}`}
        />

        <DetailCard
          icon={<MapPin size={24} />}
          label="Alamat"
          value={
            <>
              Lihat Lokasi <ChevronRight size={16} />
            </>
          }
        />
      </div>

      <div className="mb-8 mt-3 w-full rounded-md border border-primary p-3">
        <p className="mb-2 text-xs font-semibold">Jam Operasional</p>
        <div className="space-y-1">
          {operatingHours.map((operatingHour) => (
            <div
              key={operatingHour.daysOfWeek}
              className="flex items-center justify-between text-sm"
            >
              <p>{capitalize(operatingHour.daysOfWeek)}</p>
              <span>
                {operatingHour.openTime} — {operatingHour.closeTime}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: string | ReactNode
  label: string | ReactNode
  value: string | number | ReactNode
}) {
  return (
    <Card className="bg-primary/15">
      <CardHeader className="p-3">
        <CardTitle className="text-base font-semibold">{icon}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <CardDescription className="text-xs">{label}</CardDescription>
        <p className="flex items-center justify-between font-semibold">
          {value}
        </p>
      </CardContent>
    </Card>
  )
}
