import { z } from 'zod'

export const CancelEscortRequestSchema = z.object({
  escortId: z.string().min(1).max(12),
})
