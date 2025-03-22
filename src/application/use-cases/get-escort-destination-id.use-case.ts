import { getInjection } from '@/src/di/container'
import { NotFoundError } from '@/src/entities/errors/common'

export default async function getEscortDestinationIdUseCase({
  escortId,
}: {
  escortId: string
}) {
  const escortsRepository = getInjection('IEscortsRepository')
  const escort = await escortsRepository.getEscorts({
    where: { id: escortId },
    select: { destination_id: true },
  })

  if (escort.length < 1) throw new NotFoundError('Perjalanan tidak ditemukan')
  return escort[0].destination_id
}
