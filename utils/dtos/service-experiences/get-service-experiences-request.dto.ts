import { z } from 'zod'

export const GetServiceExperiencesRequestSchema = z.object({
  escortId: z.string().min(1).max(12),
})
