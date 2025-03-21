import { Prisma } from '@prisma/client'
import { injectable } from 'inversify'
import prisma from '@/lib/prisma'
import { PrismaTransactionalClient } from '@/lib/types'
import { IServiceExperiencesRepository } from '@/src/application/repositories/service-experiences.repository.interface'
import { DatabaseError } from '@/src/entities/errors/common'

@injectable()
export class ServiceExperiencesRepository
  implements IServiceExperiencesRepository
{
  constructor(private readonly db: typeof prisma = prisma) {}

  async getServiceExperiences<
    T extends Prisma.ServiceExperienceWhereInput,
    K extends Prisma.ServiceExperienceSelect,
  >(filters?: {
    where: T
    select: K
  }): Promise<Prisma.ServiceExperienceGetPayload<{ select: K }>[]> {
    try {
      return await this.db.serviceExperience.findMany(filters)
    } catch (error) {
      console.error({ getServiceExperiencesError: error })
      throw new DatabaseError(
        'Terjadi kesalahan saat mengambil data pengalaman layanan tambal ban'
      )
    }
  }

  async createServiceExperience(
    data: Prisma.ServiceExperienceCreateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void> {
    const invoker = trx ?? this.db
    try {
      await invoker.serviceExperience.create({ data })
    } catch (error) {
      console.error({ createServiceExperienceError: error })
      throw new DatabaseError(
        'Terjadi kesalahan saat membuat data pengalaman layanan tambal ban'
      )
    }
  }

  async updateServiceExperience(
    escortId: string,
    data: Prisma.ServiceExperienceUpdateInput
  ): Promise<void> {
    try {
      await this.db.serviceExperience.update({
        where: { escort_id: escortId },
        data,
      })
    } catch (error) {
      console.error({ updateServiceExperienceError: error })
      throw new DatabaseError(
        'Terjadi kesalahan saat mengubah data pengalaman layanan tambal ban'
      )
    }
  }
}
