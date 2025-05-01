import { Plus } from 'lucide-react'
import Link from 'next/link'
import SuperadminLogoutButton from '@/app/_components/superadmin/superadmin-logout-button'
import { tireRepairShopColumns } from '@/app/_components/superadmin/tire-repair-shop-columns'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DataTable } from '@/components/data-table'
import getTireRepairShopsAction from '@/utils/actions/tire-repair-shops/get-tire-repair-shops.action'

export default async function SuperadminHomePage() {
  const [tireRepairShops] = await getTireRepairShopsAction()

  return (
    <div className="px-6 py-8">
      <SuperadminLogoutButton />

      <section className="mb-4 mt-6 flex w-full items-center justify-between">
        <h1 className="font text-base font-semibold">
          List Bengkel Tambal Ban
        </h1>
        <Button
          size="sm"
          variant="outline"
          className="text-muted-foreground"
          asChild
        >
          <Link href="/tire-repair-shops/new">
            <Plus /> Daftar
          </Link>
        </Button>
      </section>

      {tireRepairShops !== null && (
        <ScrollArea className="h-[calc(100dvh-150px)]">
          <DataTable columns={tireRepairShopColumns} data={tireRepairShops} />
        </ScrollArea>
      )}
    </div>
  )
}
