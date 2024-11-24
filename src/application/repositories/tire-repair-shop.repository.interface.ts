import { Prisma } from '@prisma/client'

export interface ITireRepairShopsRepository {
  getTireRepairShops<
    T extends Prisma.TireRepairShopWhereInput,
    K extends Prisma.TireRepairShopSelect,
    I extends Prisma.TireRepairShopOrderByWithAggregationInput,
  >(filters?: {
    where?: T
    select: K
    orderBy?: I
  }): Promise<Prisma.TireRepairShopGetPayload<{ select: K }>[]>

  updateTireRepairShop(
    tireRepairShopId: number,
    data: Prisma.TireRepairShopUpdateInput
  ): Promise<void>
}
