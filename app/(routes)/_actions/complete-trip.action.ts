'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'

const CompleteTripSchema = z.object({
  tripId: z.number(),
})

export const completeTrip = createServerAction()
  .input(CompleteTripSchema)
  .handler(async ({ input }) => {
    console.log({ input })
    return { message: 'Berhasil Trip' }
  })
