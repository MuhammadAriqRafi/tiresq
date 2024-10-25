import { ContainerModule, interfaces } from 'inversify'
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface'
import { AuthenticationService } from '@/src/infrastructure/services/authentication.service'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IAuthenticationService>(Symbol.for('IAuthenticationService')).to(
    AuthenticationService
  )
}

export const AuthenticationModule = new ContainerModule(initializeModule)
