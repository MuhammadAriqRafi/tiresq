import prisma from "@/lib/prisma";
import { PrismaTransactionalClient } from "@/lib/types";
import { ITransactionManagerService } from "@/src/application/services/transaction-manager.service.interface";
import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class TransactionManagerService implements ITransactionManagerService {
    constructor(private readonly db: typeof prisma = prisma) {}
    
    startTransaction<T>(clb: (trx: PrismaTransactionalClient) => Promise<T>, parent?: PrismaClient): Promise<T> {
        const invoker = parent ?? this.db
        return invoker.$transaction(clb)
    }
}