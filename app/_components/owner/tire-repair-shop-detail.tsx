import { ChevronRight, MapPin } from 'lucide-react'
import { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function TireRepairShopDetail({
  serviceCostInRupiah,
}: {
  serviceCostInRupiah: number
}) {
  return (
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
