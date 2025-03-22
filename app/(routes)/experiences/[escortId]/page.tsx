import { notFound, redirect } from 'next/navigation'
import CreateServiceExperienceForm from '@/app/(routes)/experiences/[escortId]/_components/create-service-experience-form'
import NavigationButton from '@/components/ui/navigation-button'
import getServiceExperiences from '@/utils/actions/service-experiences/get-service-experiences.action'

export default async function ServiceExperiencesPage({
  params,
}: {
  params: { escortId: string }
}) {
  const [serviceExperience] = await getServiceExperiences({
    escortId: params.escortId,
  })

  if (serviceExperience === null) return notFound()
  if (serviceExperience.review !== null) redirect('/histories')

  return (
    <main className="flex h-dvh flex-col gap-14 p-6">
      <div className="flex items-center gap-4">
        <NavigationButton type="CLOSE" url="/histories" />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-base font-bold">
            {serviceExperience.escort.destination}
          </h1>
          <p className="text-xs font-light">
            {serviceExperience.escort.createdAt}
          </p>
        </div>
      </div>

      <CreateServiceExperienceForm
        escortId={params.escortId}
        isAnonymous={serviceExperience.isAnonymous}
        currentRating={serviceExperience.rating}
        currentReview={serviceExperience.review}
      />
    </main>
  )
}
