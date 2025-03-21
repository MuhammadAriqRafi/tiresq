import 'server-only'
import env from '@/env'
import { getInjection } from '@/src/di/container'

export default async function extendEscortExpiryPeriodUseCase({
  escortId,
}: {
  escortId: string
}) {
  const escortsRepository = getInjection('IEscortsRepository')
  await escortsRepository.updateEscort(escortId, {
    expired_at: Date.now() + env.ESCORT_EXPIRY_PERIOD_IN_MILLISECONDS,
  })
}
