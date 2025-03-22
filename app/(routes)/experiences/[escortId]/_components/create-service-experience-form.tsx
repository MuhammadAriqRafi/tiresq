'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import SubmitButton from '@/components/submit-button'
import rateOrReviewServiceExperienceAction from '@/utils/actions/service-experiences/rate-or-review-service-experience.action'
import {
  RateOrReviewServiceExperienceRequestDto,
  RateOrReviewServiceExperienceRequestSchema,
} from '@/utils/dtos/service-experiences/rate-or-review-service-experience-request.dto'

export default function CreateServiceExperienceForm({
  escortId,
  isAnonymous,
  currentRating,
  currentReview,
}: {
  escortId: string
  isAnonymous: boolean
  currentRating: number | null
  currentReview: string | null
}) {
  const router = useRouter()
  const form = useForm<RateOrReviewServiceExperienceRequestDto>({
    resolver: zodResolver(RateOrReviewServiceExperienceRequestSchema),
    defaultValues: {
      escortId,
      isAnonymous,
      rating: currentRating ?? 0,
      review: currentReview ?? '',
    },
  })

  async function onSubmit(input: RateOrReviewServiceExperienceRequestDto) {
    const [data, error] = await rateOrReviewServiceExperienceAction(input)

    if (data) {
      toast.success('Berhasil', { description: data.message })
      router.replace('/histories')
    }

    if (error) toast.error('Gagal', { description: error.message })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-center"
      >
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-semibold">Bagaimana pelayanannya?</p>
          <FormField
            name="rating"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-4">
                    {Array.from({ length: 5 }, (_, i) => i++).map((index) => {
                      const starIndex = index + 1

                      return (
                        <div key={index} className="relative">
                          <div className="peer z-10 size-7 opacity-0">
                            <Checkbox
                              checked={starIndex <= field.value}
                              onClick={() => field.onChange(starIndex)}
                              className="h-full w-full"
                            />
                          </div>
                          <Star
                            className={cn(
                              'absolute left-1/2 top-1/2 -z-10 size-7 -translate-x-1/2 -translate-y-1/2 fill-muted-foreground stroke-muted-foreground peer-has-[:checked]:fill-yellow-200 peer-has-[:checked]:stroke-yellow-500',
                              {
                                'fill-yellow-200 stroke-amber-500':
                                  starIndex <= field.value,
                              }
                            )}
                          />
                        </div>
                      )
                    })}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <RatingFeedbackMessage
            rating={form.watch('rating') as StarIndexInNumber}
          />
        </div>

        <Separator className="my-8" />

        <div className="mb-auto flex flex-col items-center gap-6">
          <p className="text-center text-sm font-semibold">
            Apa yang bisa ditingkatin? tulis masukan kamu
          </p>

          <div className="flex w-full flex-col gap-4">
            <FormField
              name="review"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="min-h-32 resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <p className="text-xs">
                {(form.watch('review') as string).length}/1000
              </p>

              <FormField
                name="isAnonymous"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        disabled={form.watch('review') === null}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Sembunyikan nama</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <SubmitButton disabled={form.formState.isSubmitting}>
          Kirim
        </SubmitButton>
      </form>
    </Form>
  )
}

function RatingFeedbackMessage({ rating }: { rating: StarIndexInNumber }) {
  const ratingFeedbackMessage = {
    1: 'Kecewa',
    2: 'Kurang Puas',
    3: 'Biasa Aja',
    4: 'Puas',
    5: 'Puas Banget',
  }

  if (rating > 5) return null
  if (rating < 1) return null

  return (
    <span className="text-sm font-semibold">
      {ratingFeedbackMessage[rating]}
    </span>
  )
}
