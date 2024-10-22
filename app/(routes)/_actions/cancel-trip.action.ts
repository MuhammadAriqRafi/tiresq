'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'

const CancelTripSchema = z.object({
  tripId: z.number(),
})

export const cancelTrip = createServerAction()
  .input(CancelTripSchema)
  .handler(async ({ input }) => {
    console.log({ input })
    return { message: 'Berhasil' }
  })
