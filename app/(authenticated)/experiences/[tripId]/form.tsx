'use client'

import { Loader2, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useServerAction } from 'zsa-react'
import rateOrReviewTripExperience from '@/app/(authenticated)/experiences/[tripId]/_actions/rate-or-review-trip-experience.action'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import InputParseError from '@/components/ui/input-parse-error'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { cn, formatInputParseErrorOutput } from '@/lib/utils'

export default function ExperienceForm({
  tripId,
  isAnonymous,
  currentRating,
  currentReview,
}: {
  tripId: string
  isAnonymous: boolean
  currentRating: number | null
  currentReview: string | null
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [rating, setRating] = useState(currentRating ?? 0)
  const { isPending, execute } = useServerAction(rateOrReviewTripExperience, {
    bind: { tripId },
    onSuccess() {
      toast({
        title: 'Berhasil',
        description:
          'Terima kasih udah kasih luangin waktu buat kasih masukannya',
      })

      router.replace('/histories')
    },
    onError({ err }) {
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description:
          err.code === 'INPUT_PARSE_ERROR' ? (
            <InputParseError
              formattedFieldErrors={formatInputParseErrorOutput(
                err.fieldErrors
              )}
            />
          ) : (
            err.message
          ),
      })
    },
  })

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (currentReview !== null) return

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('rating', rating.toString())

    await execute(formData)
  }

  return (
    <form
      method="POST"
      onSubmit={handleOnSubmit}
      className="flex h-full flex-col justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        <p className="text-sm font-semibold">Bagaimana pelayanannya?</p>
        <div className="flex gap-5">
          {Array.from({ length: 5 }, (_, i) => i++).map((index) => {
            const starIndex = index + 1

            return (
              <div key={index} className="relative">
                <div className="peer z-10 size-7 opacity-0">
                  <Checkbox
                    value={starIndex}
                    checked={starIndex <= rating}
                    className="h-full w-full"
                    onClick={() => currentReview ?? setRating(starIndex)}
                  />
                </div>
                <Star
                  className={cn(
                    'absolute left-1/2 top-1/2 -z-10 size-7 -translate-x-1/2 -translate-y-1/2 fill-muted-foreground stroke-muted-foreground peer-has-[:checked]:fill-yellow-200 peer-has-[:checked]:stroke-yellow-500',
                    { 'fill-yellow-200 stroke-yellow-500': starIndex <= rating }
                  )}
                />
              </div>
            )
          })}
        </div>
        <span className="text-sm font-semibold">Keterangan</span>
      </div>

      <Separator className="my-8" />

      <div className="mb-auto flex flex-col items-center gap-6">
        <p className="text-center text-sm font-semibold">
          Apa yang bisa ditingkatin? tulis masukan kamu
        </p>

        <div className="flex w-full flex-col gap-4">
          <Textarea
            name="review"
            disabled={currentReview !== null}
            className="h-32 w-full disabled:opacity-100"
            defaultValue={currentReview ?? ''}
          />
          <div className="flex justify-between">
            <p className="text-xs">0/1000</p>

            <div className="flex items-center gap-2">
              <Checkbox
                defaultChecked={isAnonymous}
                disabled={currentReview !== null}
                name="isAnonymous"
              />
              <Label className="text-xs">Sembunyikan nama</Label>
            </div>
          </div>
        </div>
      </div>

      {currentReview === null && (
        <Button type="submit">
          {!isPending && 'Kirim'}
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      )}
    </form>
  )
}
