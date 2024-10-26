import { Prisma } from '@prisma/client'

export interface ITireRepairShopsRepository {
  getTireRepairShops<T extends Prisma.TireRepairShopSelect>(filters?: {
    select: T
  }): Promise<Prisma.TireRepairShopGetPayload<{ select: T }>[]>
}
