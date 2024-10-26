import { ContainerModule, interfaces } from 'inversify'
import { ITripsRepository } from '@/src/application/repositories/trips.repository.interface'
import { TripsRepository } from '@/src/infrastructure/repositories/trips.repository'

const initializeModule = (bind: interfaces.Bind) => {
  bind<ITripsRepository>(Symbol.for('ITripsRepository')).to(TripsRepository)
}

export const TripsModule = new ContainerModule(initializeModule)
