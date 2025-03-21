import { Prisma } from '@prisma/client'
import { PrismaTransactionalClient } from '@/lib/types'

export interface IServiceExperiencesRepository {
  getServiceExperiences<
    T extends Prisma.ServiceExperienceWhereInput,
    K extends Prisma.ServiceExperienceSelect,
  >(filters?: {
    where: T
    select: K
  }): Promise<Prisma.ServiceExperienceGetPayload<{ select: K }>[]>

  createServiceExperience(
    data: Prisma.ServiceExperienceCreateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void>

  updateServiceExperience(
    escortId: string,
    data: Prisma.ServiceExperienceUpdateInput
  ): Promise<void>
}
