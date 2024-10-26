import { Prisma } from '@prisma/client'
import { injectable } from 'inversify'
import prisma from '@/lib/prisma'
import { ITireRepairShopsRepository } from '@/src/application/repositories/tire-repair-shop.repository.interface'
import { DatabaseError } from '@/src/entities/errors/common'

@injectable()
export class TireRepairShopRepository implements ITireRepairShopsRepository {
  constructor(private readonly db: typeof prisma = prisma) {}

  async getTireRepairShops<T extends Prisma.TireRepairShopSelect>(filters?: {
    select: T
  }): Promise<Prisma.TireRepairShopGetPayload<{ select: T }>[]> {
    try {
      return await this.db.tireRepairShop.findMany(filters)
    } catch (error) {
      console.error({ getTireRepairShopsError: error })
      throw new DatabaseError(
        'Terjadi kesalahan saat mengambil data tambal ban'
      )
    }
  }
}
