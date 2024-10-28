import { notFound } from 'next/navigation'
import ExperienceForm from '@/routes/(authenticated)/experiences/[tripId]/form'
import NavigationButton from '@/app/_components/ui/navigation-button'
import getTripExperiences from '@/app/(routes)/_actions/get-trip-experiences.action'

export default async function ExperiencesPage({
  params,
}: {
  params: { tripId: string }
}) {
  const tripExperience = await getTripExperiences({ tripId: params.tripId })
  if (tripExperience === null) return notFound()

  return (
    <main className="flex h-dvh flex-col gap-14 p-6">
      <div className="flex items-center gap-4">
        <NavigationButton type="CLOSE" url="/histories" />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-base font-bold">
            {tripExperience.tripDestinationName}
          </h1>
          <p className="text-xs font-light">{tripExperience.tripCreatedAt}</p>
        </div>
      </div>

      <ExperienceForm
        tripId={params.tripId}
        isAnonymous={tripExperience.isAnonymous}
        currentRating={tripExperience.rating}
        currentReview={tripExperience.review}
      />
    </main>
  )
}
