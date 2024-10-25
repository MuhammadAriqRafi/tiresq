import { Container } from 'inversify'
import 'reflect-metadata'
import { AuthenticationModule } from '@/src/di/modules/authentication.module'
import { DI_RETURN_TYPES, DI_SYMBOLS } from '@/src/di/types'

const ApplicationContainer = new Container({ defaultScope: 'Singleton' })

const initializeContainer = () => {
  ApplicationContainer.load(AuthenticationModule)
}

initializeContainer()

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol])
}

export { ApplicationContainer }
