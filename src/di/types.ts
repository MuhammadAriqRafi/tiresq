import { IAuthenticationService } from '@/src/application/services/authentication.service.interface'

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
}

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService
}
