'use server'

import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getTireRepairShopsUseCase from '@/src/application/use-cases/get-tire-repair-shops.use-case'

const getTireRepairShopsAction = authenticatedProcedure
  .createServerAction()
  .handler(async () => await getTireRepairShopsUseCase())

export default getTireRepairShopsAction
