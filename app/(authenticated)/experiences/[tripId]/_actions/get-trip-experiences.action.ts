'use server'

import { z } from 'zod'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getTripExperiencesUseCase from '@/src/application/use-cases/get-trip-experiences.use-case'

const GetTripExperiencesInputSchema = z.object({
  tripId: z.string().min(1),
})

const getTripExperiences = authenticatedProcedure
  .createServerAction()
  .input(GetTripExperiencesInputSchema)
  .handler(async ({ input }) => {
    return getTripExperiencesUseCase({ tripId: input.tripId })
  })

export default getTripExperiences
