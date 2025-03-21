import { ContainerModule, interfaces } from 'inversify'
import { IServiceExperiencesRepository } from '@/src/application/repositories/service-experiences.repository.interface'
import { ServiceExperiencesRepository } from '@/src/infrastructure/repositories/service-experiences.repository'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IServiceExperiencesRepository>(
    Symbol.for('IServiceExperiencesRepository')
  ).to(ServiceExperiencesRepository)
}

export const ServiceExperiencesModule = new ContainerModule(initializeModule)
