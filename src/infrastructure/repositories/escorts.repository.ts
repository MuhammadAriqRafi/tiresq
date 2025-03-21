import { Prisma } from '@prisma/client'
import { injectable } from 'inversify'
import prisma from '@/lib/prisma'
import { PrismaTransactionalClient } from '@/lib/types'
import { IEscortsRepository } from '@/src/application/repositories/escorts.repository.interface'
import { DatabaseError } from '@/src/entities/errors/common'

@injectable()
export class EscortsRepository implements IEscortsRepository {
  constructor(private readonly db: typeof prisma = prisma) {}

  async getEscorts<
    T extends Prisma.EscortWhereInput,
    K extends Prisma.EscortSelect,
    I extends Prisma.EscortOrderByWithRelationInput,
  >(
    args?: {
      skip?: number
      take?: number
      where?: T
      select: K
      orderBy?: I
    },
    trx?: PrismaTransactionalClient
  ): Promise<Prisma.EscortGetPayload<{ select: K }>[]> {
    const invoker = trx ?? this.db

    try {
      return await invoker.escort.findMany(args)
    } catch (error) {
      console.error({ getEscortsError: error })
      throw new DatabaseError(
        'Terjadi kesalahan saat mengambil data perjalanan'
      )
    }
  }

  async createEscort(
    data: Prisma.EscortCreateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void> {
    const invoker = trx ?? this.db
    try {
      await invoker.escort.create({ data })
    } catch (error) {
      console.error({ createEscortError: error })
      throw new DatabaseError('Terjadi kesalahan saat membuat data perjalanan')
    }
  }

  async updateEscort(
    escortId: string,
    data: Prisma.EscortUpdateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void> {
    const invoker = trx ?? this.db

    try {
      await invoker.escort.update({ where: { id: escortId }, data })
    } catch (error) {
      console.error({ updateEscortError: error })
      throw new DatabaseError('Terjadi kesalahan saat mengubah data perjalanan')
    }
  }
}
