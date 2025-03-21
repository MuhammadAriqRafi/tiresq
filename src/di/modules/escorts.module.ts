import { ContainerModule, interfaces } from 'inversify'
import { IEscortsRepository } from '@/src/application/repositories/escorts.repository.interface'
import { EscortsRepository } from '@/src/infrastructure/repositories/escorts.repository'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IEscortsRepository>(Symbol.for('IEscortsRepository')).to(
    EscortsRepository
  )
}

export const EscortsModule = new ContainerModule(initializeModule)
