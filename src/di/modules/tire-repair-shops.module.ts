import { ContainerModule, interfaces } from 'inversify'
import { ITireRepairShopsRepository } from '@/src/application/repositories/tire-repair-shop.repository.interface'
import { TireRepairShopRepository } from '@/src/infrastructure/repositories/tire-repair-shops.repository'

const initializeModule = (bind: interfaces.Bind) => {
  bind<ITireRepairShopsRepository>(Symbol.for('ITireRepairShopsRepository')).to(
    TireRepairShopRepository
  )
}

export const TireRepairShopsModule = new ContainerModule(initializeModule)
