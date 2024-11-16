'use server'

import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-trip.use-case'

const getOnProgressTrip = authenticatedProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const onProgressTrip = await getOnProgressTripUseCase({
      userId: ctx.user.id,
    })

    if (onProgressTrip === null)
      console.warn(`User ${ctx.user.id} - Anda sedang tidak dalam perjalanan`)

    return onProgressTrip
  })

export default getOnProgressTrip
