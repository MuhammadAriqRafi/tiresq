'use server'

import { Days } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import { getInjection } from '@/src/di/container'
import { UpdateTireRepairShopDetailRequestSchema } from '@/utils/dtos/tire-repair-shops/update-tire-repair-shop-request.dto'

const updateTireRepairShopDetailAction = authenticatedProcedure
  .createServerAction()
  .input(UpdateTireRepairShopDetailRequestSchema)
  .handler(async ({ input }) => {
    const tireRepairShopRepository = getInjection('ITireRepairShopsRepository')

    await tireRepairShopRepository.updateTireRepairShop(
      input.tireRepairShopId,
      {
        name: input.tireRepairShopName,
        service_cost_in_rupiah: input.tireRepairShopServiceCostInRupiah,
        operating_hours: {
          deleteMany: { tire_repair_shop_id: input.tireRepairShopId },
          createMany: {
            data: input.operatingHours.map((operatingHour) => ({
              open_time: formatTimeToISOFormat(operatingHour.openTime),
              close_time: formatTimeToISOFormat(operatingHour.closeTime),
              is_holiday: operatingHour.isHoliday,
              days_of_week: operatingHour.daysOfWeek as Days,
            })),
          },
        },
      }
    )

    revalidatePath('/')
    return { message: 'Berhasil mengubah informasi tambal ban' }
  })

export default updateTireRepairShopDetailAction

function formatTimeToISOFormat(time: string) {
  const [hours, minutes] = time.split(':')
  return new Date(
    new Date().setUTCHours(parseInt(hours), parseInt(minutes), 0, 0)
  )
}
