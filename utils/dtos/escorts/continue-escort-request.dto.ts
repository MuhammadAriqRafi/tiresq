import { z } from 'zod'

export const ContinueEscortRequestSchema = z.object({
  escortId: z.string().min(1).max(12),
})
