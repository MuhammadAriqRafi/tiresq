import { Prisma } from '@prisma/client'
import { injectable } from 'inversify'
import prisma from '@/lib/prisma'
import { PrismaTransactionalClient } from '@/lib/types'
import { ITireRepairShopsRepository } from '@/src/application/repositories/tire-repair-shop.repository.interface'
import { DatabaseError } from '@/src/entities/errors/common'

@injectable()
export class TireRepairShopRepository implements ITireRepairShopsRepository {
  constructor(private readonly db: typeof prisma = prisma) {}

  async getTireRepairShops<
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
  ): Promise<Prisma.TireRepairShopGetPayload<{ select: K }>[]> {
    const invoker = trx ?? this.db

    try {
      return await invoker.tireRepairShop.findMany(filters)
    } catch (error) {
      console.error({ getTireRepairShopsError: error })
      throw new DatabaseError(
        'Terjadi kesalahan saat mengambil data tambal ban'
      )
    }
  }

  async updateTireRepairShop(
    tireRepairShopId: string,
    data: Prisma.TireRepairShopUpdateInput
  ): Promise<void> {
    try {
      await this.db.tireRepairShop.update({
        where: { id: tireRepairShopId },
        data,
      })
    } catch (error) {
      console.error({ updateTireRepairShopError: error })
      throw new DatabaseError('Terjadi kesalahan saat mengubah data tambal ban')
    }
  }
}
