'use server'

import { revalidatePath } from 'next/cache'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import env from '@/env'
import createTireRepairShopUseCase from '@/src/application/use-cases/create-tire-repair-shop.use-case'
import { getInjection } from '@/src/di/container'
import { RegisterTireRepairShopRequestSchema } from '@/utils/dtos/tire-repair-shops/register-tire-repair-shop-request.dto'

const registerTireRepairShopAction = authenticatedProcedure
  .createServerAction()
  .input(RegisterTireRepairShopRequestSchema)
  .handler(async ({ input }) => {
    const authenticationsService = getInjection('IAuthenticationService')

    const newOwner = await authenticationsService.registerOwner({
      email: input.ownerEmail,
      password: env.NEW_OWNER_DEFAULT_PASSWORD,
    })

    await createTireRepairShopUseCase({
      ownerId: newOwner.id,
      tireRepairShopName: input.tireRepairShopName,
      tireRepairShopLatitude: input.tireRepairShopLatitude,
      tireRepairShopLongitude: input.tireRepairShopLongitude,
    })

    revalidatePath('/')
    return { message: 'Berhasil mendaftarkan bengkel tambal ban' }
  })

export default registerTireRepairShopAction
