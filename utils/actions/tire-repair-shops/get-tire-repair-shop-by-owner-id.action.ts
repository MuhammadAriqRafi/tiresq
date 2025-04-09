'use server'

import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getTireRepairShopByOwnerIdUseCase from '@/src/application/use-cases/get-tire-repair-shop-by-owner-id.use-case'

const getTireRepairShopByOwnerIdAction = authenticatedProcedure
  .createServerAction()
  .handler(
    async ({ ctx }) =>
      await getTireRepairShopByOwnerIdUseCase({ ownerId: ctx.user.id })
  )

export default getTireRepairShopByOwnerIdAction
