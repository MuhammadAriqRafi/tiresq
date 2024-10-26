import { type LatLngLiteral } from '@googlemaps/google-maps-services-js'
import 'server-only'
import env from '@/env'
import { getInjection } from '@/src/di/container'
import { NotFoundError } from '@/src/entities/errors/common'

export default async function getNearestTireRepairShopUseCase({
  origin,
}: {
  origin: LatLngLiteral
}) {
  const tireRepairShopsRepository = getInjection('ITireRepairShopsRepository')
  const tireRepairShops = await tireRepairShopsRepository.getTireRepairShops({
    select: { id: true, lat: true, lng: true },
  })

  if (tireRepairShops.length < 1)
    throw new NotFoundError('Tambal ban masih kosong')

  const mapsService = getInjection('IMapsService')
  const distanceMatrix = await mapsService.distanceMatrix(
    [origin],
    tireRepairShops
  )
  const distanceMatrixRows = distanceMatrix.rows[0].elements

  if (distanceMatrixRows.length < 1)
    throw new NotFoundError(
      'Maaf, kami belum dapat menemukan tambal ban dalam radius 5 Km dari lokasi kamu'
    )

  const { choosenDestinationIndex, shortestDistance } =
    distanceMatrixRows.reduce(
      (shortest, current, index) => {
        const { shortestDistance } = shortest
        const currentRowDistance = current.distance.value

        if (isDistanceOutOfBoundary(currentRowDistance)) return shortest
        if (currentRowDistance < shortestDistance) {
          return {
            choosenDestinationIndex: index,
            shortestDistance: currentRowDistance,
          }
        }

        return shortest
      },
      {
        choosenDestinationIndex: 0,
        shortestDistance: distanceMatrixRows[0].distance.value,
      }
    )

  if (isDistanceOutOfBoundary(shortestDistance))
    throw new NotFoundError(
      'Maaf, kami belum dapat menemukan tambal ban dalam radius 5 Km dari lokasi kamu'
    )

  return tireRepairShops[choosenDestinationIndex]
}

function isDistanceOutOfBoundary(distance: number) {
  return distance > env.MAXIMUM_DISTANCE_IN_METER
}
