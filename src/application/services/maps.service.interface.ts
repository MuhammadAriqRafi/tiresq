import {
  type DistanceMatrixResponseData,
  type LatLngLiteral,
} from '@googlemaps/google-maps-services-js'

export interface IMapsService {
  distanceMatrix(
    origins: LatLngLiteral[],
    destinations: LatLngLiteral[]
  ): Promise<DistanceMatrixResponseData>
}
