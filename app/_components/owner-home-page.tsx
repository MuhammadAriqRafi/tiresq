import { Star } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import OwnerLogoutButton from '@/app/_components/owner-logout-button'
import TireRepairShopDetail from '@/app/_components/owner/tire-repair-shop-detail'
import TireRepairShopReviews from '@/app/_components/owner/tire-repair-shop-reviews'
import ToggleTireRepairShopAvailabilitySwitch from '@/app/_components/toggle-tire-repair-shop-availability-switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import getTireRepairShopByOwnerIdAction from '@/utils/actions/tire-repair-shops/get-tire-repair-shop-by-owner-id.action'

export default async function OwnerHomePage() {
  const [tireRepairShop] = await getTireRepairShopByOwnerIdAction()
  if (tireRepairShop === null) return notFound()

  return (
    <div className="relative">
      <OwnerLogoutButton />

      <div className="space-y-6 p-8">
        <section className="flex flex-col items-center gap-4">
          <div className="relative h-20 w-20">
            <Image
              fill
              src="https://picsum.photos/id/58/64"
              alt="Profile Picture"
              className="rounded-full bg-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-bold">{tireRepairShop.name}</h2>
            <ToggleTireRepairShopAvailabilitySwitch
              isOpen={tireRepairShop.isOpen}
            />
          </div>
        </section>

        <section className="flex items-center justify-around border-b border-b-gray-200">
          <div className="flex w-1/2 flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <Star className="fill-yellow-300 stroke-yellow-600" size={20} />
              <h2
                className={cn(
                  'text-2xl font-semibold',
                  tireRepairShop.rating < 1 && 'text-muted-foreground'
                )}
              >
                {tireRepairShop.rating > 0 ? tireRepairShop.rating : 'N/A'}
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">Rating</span>
          </div>

          <Separator
            orientation="vertical"
            className="h-[72px] w-[1px] bg-gray-200"
          />

          <div className="flex w-1/2 flex-col items-center gap-1">
            <h2 className="text-2xl font-semibold">10</h2>
            <span className="text-xs text-muted-foreground">Kunjungan</span>
          </div>
        </section>

        <section>
          <Tabs defaultValue="tire-repair-shop-detail" className="items-center">
            <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="reviews"
                className="relative w-1/2 flex-grow rounded-none py-2 text-xs font-normal after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="tire-repair-shop-detail"
                className="relative w-1/2 flex-grow rounded-none py-2 text-xs font-normal after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              >
                Informasi Tambal Ban
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews">
              <TireRepairShopReviews />
            </TabsContent>
            <TabsContent value="tire-repair-shop-detail">
              <TireRepairShopDetail
                serviceCostInRupiah={tireRepairShop.serviceCostInRupiah}
              />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  )
}
