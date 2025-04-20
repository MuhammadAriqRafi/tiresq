import { Footprints, Hourglass, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import RatingBadge from '@/components/ui/rating-badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import changeEscortDestination from '@/utils/actions/core/change-escort-destination.action'
import findNearestTireRepairShopAlternatives from '@/utils/actions/core/find-nearest-tire-repair-shop-alternatives.action'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'
import { useUserLocation } from '@/utils/providers/user-location-provider'

export default function AlternativeTireRepairShops() {
  const userLocation = useUserLocation()
  const [isOpen, setIsOpen] = useState('')
  const [alternativeTireRepairShops, setAlternativeTireRepairShops] = useState<
    NearestTireRepairShop[]
  >([])

  const { isPending, execute } = useServerAction(
    findNearestTireRepairShopAlternatives,
    {
      onSuccess({ data }) {
        setAlternativeTireRepairShops(data)
      },
    }
  )

  if (userLocation === null) return null

  return (
    <Accordion
      type="single"
      value={isOpen}
      collapsible
      onValueChange={setIsOpen}
    >
      <AccordionItem
        className="border-b-0"
        value="alternative-tire-repair-shop"
      >
        <AccordionTrigger
          className="justify-center gap-3 py-0 text-xs font-medium text-muted-foreground hover:text-primary hover:no-underline"
          onClick={() => {
            if (isOpen === '' && alternativeTireRepairShops.length < 1)
              execute({ origin: userLocation.coordinate })
          }}
        >
          Pindah Ke Tambal Ban Lain?
        </AccordionTrigger>
        <ScrollArea>
          <AccordionContent className="flex items-center gap-3 pb-0 pt-4">
            {isPending && (
              <Loader2 className="mx-auto animate-spin stroke-muted-foreground" />
            )}

            {!isPending &&
              alternativeTireRepairShops.length > 0 &&
              alternativeTireRepairShops.map((alternativeTireRepairShop) => (
                <AlternativeTireRepairShopItem
                  key={alternativeTireRepairShop.id}
                  id={alternativeTireRepairShop.id}
                  name={alternativeTireRepairShop.name}
                  rating={alternativeTireRepairShop.rating}
                  distance={alternativeTireRepairShop.distance}
                  duration={alternativeTireRepairShop.duration}
                />
              ))}

            {!isPending && alternativeTireRepairShops.length < 1 && (
              <span className="text-center text-xs italic text-muted-foreground">
                Maaf, sepertinya dalam radius 5 km hanya tambal ban yang sedang
                kamu tuju yang tersedia
              </span>
            )}
          </AccordionContent>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </AccordionItem>
    </Accordion>
  )
}

function AlternativeTireRepairShopItem({
  id,
  name,
  rating,
  distance,
  duration,
}: {
  id: string
  name: string
  rating: number
  distance: string
  duration: string
}) {
  const { onProgressEscort, refreshOnProgressEscort } = useOnProgressEscort()

  async function handleOnClick() {
    if (onProgressEscort === null) return null

    const [data, error] = await changeEscortDestination({
      escortId: onProgressEscort.escortId,
      destinationId: id,
    })

    // if (data) toast.success('Berhasil', { description: data.message })
  }

  return (
    <Card
      onClick={handleOnClick}
      className="flex w-max flex-row gap-4 px-3 py-4"
    >
      <CardHeader className="p-0">
        <CardTitle className="text-sm font-semibold">{name}</CardTitle>
        <CardDescription>
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Footprints size={14} />
              <p className="text-xs">{distance}</p>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Hourglass size={14} />
              <p className="text-xs">{duration}</p>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <RatingBadge rating={rating} />
      </CardContent>
    </Card>
  )
}
