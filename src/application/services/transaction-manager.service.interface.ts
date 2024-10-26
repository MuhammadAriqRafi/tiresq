import { PrismaClient } from '@prisma/client'
import { PrismaTransactionalClient } from '@/lib/types'

export interface ITransactionManagerService {
  startTransaction<T>(
    clb: (trx: PrismaTransactionalClient) => Promise<T>,
    parent?: PrismaClient
  ): Promise<T>
}
