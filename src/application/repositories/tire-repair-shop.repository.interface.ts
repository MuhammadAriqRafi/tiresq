import { Prisma } from '@prisma/client'
import { PrismaTransactionalClient } from '@/lib/types'

export interface ITireRepairShopsRepository {
  getTireRepairShops<
    T extends Prisma.TireRepairShopWhereInput,
    K extends Prisma.TireRepairShopSelect,
    I extends Prisma.TireRepairShopOrderByWithAggregationInput,
  >(
    filters?: {
      where?: T
      select: K
      orderBy?: I
    },
    trx?: PrismaTransactionalClient
  ): Promise<Prisma.TireRepairShopGetPayload<{ select: K }>[]>

  updateTireRepairShop(
    tireRepairShopId: string,
    data: Prisma.TireRepairShopUpdateInput,
    trx?: PrismaTransactionalClient
  ): Promise<void>
}
