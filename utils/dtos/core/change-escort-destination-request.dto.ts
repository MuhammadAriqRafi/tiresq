import { z } from 'zod'

export const ChangeEscortDestinationRequestSchema = z.object({
  destinationId: z.string().min(12).max(12),
  escortId: z.string().min(12).max(12),
})
