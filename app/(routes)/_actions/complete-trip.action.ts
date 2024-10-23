'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

const CompleteTripSchema = z.object({
  tripId: z.number(),
})

export const completeTrip = createServerAction()
  .input(CompleteTripSchema)
  .handler(async ({ input }) => {
    // TODO: If the user is not authenticated, return success message instead of redirect
    redirect(`/experiences/${input.tripId}`)
  })
