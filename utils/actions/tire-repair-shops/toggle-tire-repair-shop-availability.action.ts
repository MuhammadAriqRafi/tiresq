'use server'

import { revalidatePath } from 'next/cache'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import toggleTireRepairShopAvailabilityUseCase from '@/src/application/use-cases/toggle-tire-repair-shop-availability.use-case'
import { ToggleTireRepairShopAvailabilityRequestSchema } from '@/utils/dtos/tire-repair-shops/toggle-tire-repair-shop-availability-request.dto'

const toggleTireRepairShopAvailabilityAction = authenticatedProcedure
  .createServerAction()
  .input(ToggleTireRepairShopAvailabilityRequestSchema)
  .handler(async ({ input }) => {
    await toggleTireRepairShopAvailabilityUseCase(input)
    revalidatePath('/')
    return { message: 'Ketersediaan tambal ban berhasil diubah' }
  })

export default toggleTireRepairShopAvailabilityAction
