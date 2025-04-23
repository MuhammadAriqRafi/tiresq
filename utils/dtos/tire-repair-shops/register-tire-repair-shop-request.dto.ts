import { z } from 'zod'

export const RegisterTireRepairShopRequestSchema = z.object({
  tireRepairShopName: z
    .string()
    .min(1, { message: 'Nama bengkel tambal ban harus diisi' })
    .max(255),
  ownerEmail: z
    .string()
    .min(1, { message: 'Email pemilik bengkel tambal ban harus diisi' })
    .email(),
  tireRepairShopLongitude: z.coerce.number().refine((value) => value !== 0, {
    message: 'Longitude bengkel tambal ban harus diisi',
  }),
  tireRepairShopLatitude: z.coerce.number().refine((value) => value !== 0, {
    message: 'Latitude bengkel tambal ban harus diisi',
  }),
})

export const registerTireRepairShopRequestDefaultValues = {
  ownerEmail: '',
  tireRepairShopName: '',
  tireRepairShopLongitude: '' as unknown as number,
  tireRepairShopLatitude: '' as unknown as number,
} satisfies RegisterTireRepairShopRequestDto

export type RegisterTireRepairShopRequestDto = z.infer<
  typeof RegisterTireRepairShopRequestSchema
>
