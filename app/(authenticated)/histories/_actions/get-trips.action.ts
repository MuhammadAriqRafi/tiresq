'use server'

import { TripStatus } from '@prisma/client'
import { z } from 'zod'
import { TRIP_STATUS } from '@/lib/constants'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getTripsUseCase from '@/src/application/use-cases/get-trips.use-case'

const GetTripsInputSchema = z
  .object({ status: z.string().optional() })
  .transform((field) => {
    if (field.status && !TRIP_STATUS.includes(field.status))
      return { ...field, status: undefined }

    return field
  })

const getTrips = authenticatedProcedure
  .createServerAction()
  .input(GetTripsInputSchema)
  .handler(async ({ input, ctx }) => {
    return await getTripsUseCase({
      status: input.status as TripStatus,
      userId: ctx.user.id,
    })
  })

export default getTrips
