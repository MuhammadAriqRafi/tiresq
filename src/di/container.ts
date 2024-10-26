import { Container } from 'inversify'
import 'reflect-metadata'
import { AuthenticationModule } from '@/src/di/modules/authentication.module'
import { DatabaseModule } from '@/src/di/modules/database.module'
import { MapsModule } from '@/src/di/modules/maps.module'
import { TireRepairShopsModule } from '@/src/di/modules/tire-repair-shops.module'
import { TripsModule } from '@/src/di/modules/trips.module'
import { DI_RETURN_TYPES, DI_SYMBOLS } from '@/src/di/types'

const ApplicationContainer = new Container({ defaultScope: 'Singleton' })

const initializeContainer = () => {
  ApplicationContainer.load(TripsModule)
  ApplicationContainer.load(TireRepairShopsModule)
  ApplicationContainer.load(MapsModule)
  ApplicationContainer.load(AuthenticationModule)
  ApplicationContainer.load(DatabaseModule)
}

initializeContainer()

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol])
}

export { ApplicationContainer }
