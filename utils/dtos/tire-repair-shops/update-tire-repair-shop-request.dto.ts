import { z } from 'zod'

export const UpdateTireRepairShopDetailRequestSchema = z.object({
  tireRepairShopId: z.string().min(12).max(12),
  tireRepairShopName: z
    .string()
    .min(1, { message: 'Nama tambal ban harus diisi' })
    .max(255),
  tireRepairShopServiceCostInRupiah: z.coerce
    .number()
    .gt(0, { message: 'Biaya tambal ban harus diisi' }),
  operatingHours: z
    .object({
      daysOfWeek: z.string().min(1, { message: 'Hari harus diisi' }).max(255),
      isHoliday: z.boolean().default(false),
      openTime: z.string().min(1),
      closeTime: z.string().min(1),
    })
    .array()
    .nonempty(),
})

export type UpdateTireRepairShopDetailRequestDto = z.infer<
  typeof UpdateTireRepairShopDetailRequestSchema
>
