import { getInjection } from '@/src/di/container'

export default async function recalculateTireRepairShopRatingUseCase({
  tireRepairShopId,
}: {
  tireRepairShopId: string
}) {
  const escortsRepository = getInjection('IEscortsRepository')
  const escorts = await escortsRepository.getEscorts({
    select: { service_experience: { select: { rating: true } } },
    where: {
      status: 'COMPLETED',
      destination_id: tireRepairShopId,
      service_experience: { rating: { not: null } },
    },
  })

  if (escorts.length < 1) return -1

  const initialStars = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
  const numberOfEachStar: Record<StarIndexInString, number> = escorts.reduce(
    (initialStars, escort) => {
      const rating =
        escort.service_experience?.rating?.toString() as StarIndexInString
      initialStars[rating] += 1
      return initialStars
    },
    initialStars
  )

  return calculateRatingUsingWeightedAverageMethod(numberOfEachStar)
}

const calculateRatingUsingWeightedAverageMethod = (
  numberOfEachStar: Record<StarIndexInString, number>
) => {
  let sumOfAllRatings = 0
  const weightedAverageMethod = Object.keys(numberOfEachStar).reduce(
    (rating, starIndex) => {
      sumOfAllRatings += numberOfEachStar[starIndex as StarIndexInString]
      return (
        rating +
        Number(starIndex) * numberOfEachStar[starIndex as StarIndexInString]
      )
    },
    0
  )
  const result = (weightedAverageMethod / sumOfAllRatings).toFixed(1)

  return Number(result)
}
