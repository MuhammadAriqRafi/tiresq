import { z } from 'zod'
import { ESCORT_STATUS } from '@/lib/constants'

export const GetEscortHistoriesSearchParamsSchema = z.object({
  status: z
    .string()
    .optional()
    .transform((value) =>
      value && ESCORT_STATUS.indexOf(value) === -1 ? undefined : value
    ),
  createdAt: z
    .string()
    .or(z.number())
    .optional()
    .transform((value) => {
      if (value) {
        const coercedCreatedAt = Number(value)
        if (!isNaN(coercedCreatedAt)) return coercedCreatedAt
        else return undefined
      }
    }),
})

export type GetEscortHistoriesSearchParamsDto = z.infer<
  typeof GetEscortHistoriesSearchParamsSchema
>
