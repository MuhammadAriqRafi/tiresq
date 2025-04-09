import { z } from 'zod'

export const ToggleTireRepairShopAvailabilityRequestSchema = z.object({
  tireRepairShopId: z.string().min(1).max(12),
  isOpen: z.boolean(),
})

export type ToggleTireRepairShopAvailabilityRequestDto = z.infer<
  typeof ToggleTireRepairShopAvailabilityRequestSchema
>
