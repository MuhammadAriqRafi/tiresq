import { ITireRepairShopsRepository } from '@/src/application/repositories/tire-repair-shop.repository.interface'
import { ITripsRepository } from '@/src/application/repositories/trips.repository.interface'
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface'
import { IMapsService } from '@/src/application/services/maps.service.interface'
import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface'

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  ITransactionManagerService: Symbol.for('ITransactionManagerService'),
  IMapsService: Symbol.for('IMapsService'),

  // Repositories
  ITireRepairShopsRepository: Symbol.for('ITireRepairShopsRepository'),
  ITripsRepository: Symbol.for('ITripsRepository'),
}

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService
  ITransactionManagerService: ITransactionManagerService
  IMapsService: IMapsService

  // Repositories
  ITripsRepository: ITripsRepository
  ITireRepairShopsRepository: ITireRepairShopsRepository
}
