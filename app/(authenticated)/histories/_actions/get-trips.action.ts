'use server'

import { TripStatus } from '@prisma/client'
import { z } from 'zod'
import { TRIP_STATUS } from '@/lib/constants'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getTripsUseCase from '@/src/application/use-cases/get-trips.use-case'

const GetTripsInputSchema = z
  .object({
    status: z.string().optional(),
    createdAt: z.string().or(z.number()).optional(),
  })
  .transform((field) => {
    if (field.createdAt) {
      const coercedCreatedAt = Number(field.createdAt)
      if (!isNaN(coercedCreatedAt))
        field = { ...field, createdAt: coercedCreatedAt }
      else field = { ...field, createdAt: undefined }
    }

    if (field.status && !TRIP_STATUS.includes(field.status))
      field = { ...field, status: undefined }

    return field
  })

const getTrips = authenticatedProcedure
  .createServerAction()
  .input(GetTripsInputSchema)
  .handler(async ({ input, ctx }) => {
    return await getTripsUseCase({
      userId: ctx.user.id,
      status: input.status as TripStatus,
      createdAt: input.createdAt as number | undefined,
    })
  })

export default getTrips
