import {
  Client,
  DistanceMatrixResponseData,
  type LatLngLiteral,
  TravelMode,
} from '@googlemaps/google-maps-services-js'
import env from '@/env'
import { IMapsService } from '@/src/application/services/maps.service.interface'
import { injectable } from 'inversify'

@injectable()
export class MapsService implements IMapsService {
  constructor(private readonly mapsService = new Client({})) {}

  async distanceMatrix(
    origins: LatLngLiteral[],
    destinations: LatLngLiteral[]
  ): Promise<DistanceMatrixResponseData> {
    const distanceMatrixResponse = await this.mapsService.distancematrix({
      timeout: 10000,
      params: {
        origins,
        destinations,
        mode: TravelMode.walking,
        key: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    })

    return distanceMatrixResponse.data
  }
}
