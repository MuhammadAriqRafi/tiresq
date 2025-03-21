import { z } from 'zod'

enum CancelEscortConfirmationCause {
  CANCEL = 'CANCEL',
  COMPLETE = 'COMPLETE',
}

export const CancelEscortConfirmationRequestSchema = z.object({
  escortId: z.string().min(1),
  cause: z.nativeEnum(CancelEscortConfirmationCause, {
    message: 'Silahkan pilih alasan terlebih dahulu',
  }),
})

export type CancelEscortConfirmationRequestDto = z.infer<
  typeof CancelEscortConfirmationRequestSchema
>

export const cancelEscortConfirmationRequestDefaultValue = {
  escortId: '',
  cause: '' as CancelEscortConfirmationCause,
} satisfies CancelEscortConfirmationRequestDto
