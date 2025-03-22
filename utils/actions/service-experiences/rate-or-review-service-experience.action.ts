'use server'

import { revalidatePath } from 'next/cache'
import { authenticatedProcedure } from '@/lib/zsa/procedures'
import getEscortDestinationIdUseCase from '@/src/application/use-cases/get-escort-destination-id.use-case'
import rateOrReviewServiceExperienceUseCase from '@/src/application/use-cases/rate-or-review-service-experience.use-case'
import recalculateTireRepairShopRatingUseCase from '@/src/application/use-cases/recalculate-tire-repair-shop-rating.use-case'
import updateTireRepairShopRatingUseCase from '@/src/application/use-cases/update-tire-repair-shop-rating.use-case'
import { RateOrReviewServiceExperienceRequestSchema } from '@/utils/dtos/service-experiences/rate-or-review-service-experience-request.dto'

const rateOrReviewServiceExperienceAction = authenticatedProcedure
  .createServerAction()
  .input(RateOrReviewServiceExperienceRequestSchema)
  .handler(async ({ input }) => {
    await rateOrReviewServiceExperienceUseCase({
      rating: input.rating,
      review: input.review,
      escortId: input.escortId,
      isAnonymous: input.isAnonymous,
    })

    const escortDestinationId = await getEscortDestinationIdUseCase({
      escortId: input.escortId,
    })

    const tireRepairShopNewRating =
      await recalculateTireRepairShopRatingUseCase({
        tireRepairShopId: escortDestinationId,
      })

    await updateTireRepairShopRatingUseCase({
      tireRepairShopId: escortDestinationId,
      rating: tireRepairShopNewRating,
    })

    revalidatePath('/histories')
    return {
      message: 'Terima kasih udah kasih luangin waktu buat kasih masukannya',
    }
  })

export default rateOrReviewServiceExperienceAction
