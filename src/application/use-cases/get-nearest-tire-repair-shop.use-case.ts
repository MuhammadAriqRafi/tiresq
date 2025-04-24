import { type LatLngLiteral } from '@googlemaps/google-maps-services-js'
import 'server-only'
import { PrismaTransactionalClient } from '@/lib/types'
import env from '@/env'
import { getInjection } from '@/src/di/container'
import { NotFoundError } from '@/src/entities/errors/common'

export default async function getNearestTireRepairShopUseCase(
  {
    origin,
  }: {
    origin: LatLngLiteral
  },
  trx?: PrismaTransactionalClient
) {
  const tireRepairShopsRepository = getInjection('ITireRepairShopsRepository')
  const tireRepairShops = (
    await tireRepairShopsRepository.getTireRepairShops(
      {
        where: { is_open: true },
        select: {
          id: true,
          name: true,
          rating: true,
          latitude: true,
          longitude: true,
        },
      },
      trx
    )
  ).map((tireRepairShop) => ({
    id: tireRepairShop.id,
    lat: tireRepairShop.latitude,
    lng: tireRepairShop.longitude,
    name: tireRepairShop.name,
    rating: tireRepairShop.rating.toNumber(),
  }))

  if (tireRepairShops.length < 1)
    throw new NotFoundError('Tambal ban belum tersedia')

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

  const nearestTireRepairShop: (NearestTireRepairShop & {
    distanceInMeter: number
  })[] = []

  distanceMatrixRows.forEach((destination, index) => {
    const destinationDistance = destination.distance.value

    if (!isDistanceOutOfBoundary(destinationDistance))
      return nearestTireRepairShop.push({
        ...tireRepairShops[index],
        duration: destination.duration.text,
        distance: destination.distance.text,
        distanceInMeter: destinationDistance,
      })
  })

  if (nearestTireRepairShop.length < 1)
    throw new NotFoundError(
      'Maaf, kami belum dapat menemukan tambal ban dalam radius 5 Km dari lokasi kamu'
    )

  const sortedNearestTireRepairShop = nearestTireRepairShop
    .toSorted((current, next) => current.distanceInMeter - next.distanceInMeter)
    .toSpliced(5)

  return sortedNearestTireRepairShop.toSpliced(5)
}

function isDistanceOutOfBoundary(distance: number) {
  return distance > env.MAXIMUM_DISTANCE_IN_METER
}
