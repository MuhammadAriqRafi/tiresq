import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import { customAlphabetNanoid } from '@/lib/utils'
import { getInjection } from '@/src/di/container'

export default async function createServiceExperienceUseCase(
  {
    escortId,
  }: {
    escortId: string
  },
  trx?: PrismaTransactionalClient
) {
  const serviceExperiencesRepository = getInjection(
    'IServiceExperiencesRepository'
  )
  await serviceExperiencesRepository.createServiceExperience(
    {
      id: customAlphabetNanoid(),
      escort: { connect: { id: escortId } },
    },
    trx
  )
}
