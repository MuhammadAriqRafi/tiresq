import { ContainerModule, interfaces } from 'inversify'
import { IUserRepository } from '@/src/application/repositories/user.repository.interface'
import { UserRepository } from '@/src/infrastructure/repositories/user-repository'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IUserRepository>(Symbol.for('IUserRepository')).to(UserRepository)
}

export const UsersModule = new ContainerModule(initializeModule)
