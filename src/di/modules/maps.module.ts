import { ContainerModule, interfaces } from 'inversify'
import { IMapsService } from '@/src/application/services/maps.service.interface'
import { MapsService } from '@/src/infrastructure/services/maps.service'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IMapsService>(Symbol.for('IMapsService')).to(MapsService)
}

export const MapsModule = new ContainerModule(initializeModule)
