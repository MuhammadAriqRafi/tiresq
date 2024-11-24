import { getInjection } from '@/src/di/container'

type StarIndex = '1' | '2' | '3' | '4' | '5'

export default async function recalculateTireRepairShopRatingUseCase({
  tireRepairShopId,
}: {
  tireRepairShopId: Promise<number>
}) {
  const tripsRepository = getInjection('ITripsRepository')
  const trips = await tripsRepository.getTrips({
    select: { experience: { select: { rating: true } } },
    where: {
      status: 'COMPLETED',
      experience: { rating: { not: null } },
      destinationId: await tireRepairShopId,
    },
  })

  if (trips.length < 1) return -1

  const initialStars = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
  const numberOfEachStar: Record<StarIndex, number> = trips.reduce(
    (initialStars, trip) => {
      const rating = trip.experience?.rating?.toString()
      initialStars[rating as StarIndex] += 1
      return initialStars
    },
    initialStars
  )

  return calculateRatingUsingWeightedAverageMethod(numberOfEachStar)
}

const calculateRatingUsingWeightedAverageMethod = (
  numberOfEachStar: Record<StarIndex, number>
) => {
  let sumOfAllRatings = 0
  const weightedAverageMethod = Object.keys(numberOfEachStar).reduce(
    (rating, starIndex) => {
      sumOfAllRatings += numberOfEachStar[starIndex as StarIndex]
      return (
        rating + Number(starIndex) * numberOfEachStar[starIndex as StarIndex]
      )
    },
    0
  )
  const result = (weightedAverageMethod / sumOfAllRatings).toFixed(1)

  return Number(result)
}
