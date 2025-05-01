import { notFound } from 'next/navigation'
import UpdateTireRepairShopDetailForm from '@/app/(routes)/tire-repair-shops/edit/_components/update-tire-repair-shop-detail-form'
import getTireRepairShopByOwnerIdAction from '@/utils/actions/tire-repair-shops/get-tire-repair-shop-by-owner-id.action'

export default async function UpdateTireRepairShopDetailPage() {
  const [tireRepairShop] = await getTireRepairShopByOwnerIdAction()
  if (tireRepairShop === null) return notFound()

  return (
    <section className="p-6">
      <UpdateTireRepairShopDetailForm
        tireRepairShopId={tireRepairShop.id}
        tireRepairShopName={tireRepairShop.name}
        tireRepairShopOperatingHours={tireRepairShop.operatingHours}
        tireRepairShopServiceCostInRupiah={tireRepairShop.serviceCostInRupiah}
      />
    </section>
  )
}
