import { z } from 'zod'

export const CompleteEscortRequestSchema = z.object({
  escortId: z.string().min(1).max(12),
})
