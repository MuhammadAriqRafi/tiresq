import { IEscortsRepository } from '@/src/application/repositories/escorts.repository.interface'
import { IServiceExperiencesRepository } from '@/src/application/repositories/service-experiences.repository.interface'
import { ITireRepairShopsRepository } from '@/src/application/repositories/tire-repair-shop.repository.interface'
import { IUserRepository } from '@/src/application/repositories/user.repository.interface'
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface'
import { IMapsService } from '@/src/application/services/maps.service.interface'
import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface'

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  ITransactionManagerService: Symbol.for('ITransactionManagerService'),
  IMapsService: Symbol.for('IMapsService'),

  // Repositories
  IUserRepository: Symbol.for('IUserRepository'),
  IEscortsRepository: Symbol.for('IEscortsRepository'),
  ITireRepairShopsRepository: Symbol.for('ITireRepairShopsRepository'),
  IServiceExperiencesRepository: Symbol.for('IServiceExperiencesRepository'),
}

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService
  ITransactionManagerService: ITransactionManagerService
  IMapsService: IMapsService

  // Repositories
  IUserRepository: IUserRepository
  IEscortsRepository: IEscortsRepository
  ITireRepairShopsRepository: ITireRepairShopsRepository
  IServiceExperiencesRepository: IServiceExperiencesRepository
}
