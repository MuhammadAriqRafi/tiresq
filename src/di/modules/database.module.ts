import { ContainerModule, interfaces } from 'inversify'
import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface'
import { TransactionManagerService } from '@/src/infrastructure/services/transaction-manager.service'

const initializeModule = (bind: interfaces.Bind) => {
  bind<ITransactionManagerService>(Symbol.for('ITransactionManagerService')).to(
    TransactionManagerService
  )
}

export const DatabaseModule = new ContainerModule(initializeModule)
