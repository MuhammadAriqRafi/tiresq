import { Prisma } from '@prisma/client'
import { PrismaTransactionalClient } from '@/lib/types'

export interface IEscortsRepository {
  getEscorts<
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
  ): Promise<Prisma.EscortGetPayload<{ select: K }>[]>

  createEscort(
    data: Prisma.EscortCreateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void>

  updateEscort(
    escortId: string,
    data: Prisma.EscortUpdateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void>
}
