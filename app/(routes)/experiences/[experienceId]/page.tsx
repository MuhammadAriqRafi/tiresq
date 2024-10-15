import { Star } from 'lucide-react'
import { notFound } from 'next/navigation'
import BackButton from '@/app/_components/ui/back-button'
import { Button } from '@/app/_components/ui/button'
import { Checkbox } from '@/app/_components/ui/checkbox'
import { Label } from '@/app/_components/ui/label'
import { Separator } from '@/app/_components/ui/separator'
import { Textarea } from '@/app/_components/ui/textarea'
import { histories } from '@/lib/data'

export default function ExperiencePage({
  params,
}: {
  params: { experienceId: string }
}) {
  const history = histories.find(
    (history) => history.id === parseInt(params.experienceId)
  )

  if (!history) return notFound()

  return (
    <main className="flex h-dvh flex-col gap-14 p-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-bold">{history.name}</h1>
          <p className="text-xs font-light">{history.createdAt}</p>
        </div>
      </div>

      <form className="flex h-full flex-col justify-center">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-semibold">Bagaimana pelayanannya?</p>
          <div className="flex gap-8">
            {Array.from({ length: 5 }, (_, i) => i++).map((index) => (
              <div key={index} className="relative">
                <div className="peer z-10 opacity-0">
                  <Checkbox />
                </div>
                <Star className="absolute left-1/2 top-1/2 -z-10 size-8 -translate-x-1/2 -translate-y-1/2 fill-muted-foreground stroke-muted-foreground peer-has-[:checked]:fill-yellow-200 peer-has-[:checked]:stroke-yellow-500" />
              </div>
            ))}
          </div>
          <span className="text-sm font-semibold">Keterangan</span>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-semibold">
            Apa yang bisa ditingkatin? tulis masukan kamu
          </p>

          <div className="flex w-full flex-col gap-4">
            <Textarea className="h-32 w-full" />
            <div className="flex justify-between">
              <p className="text-xs">0/1000</p>

              <div className="flex items-center gap-2">
                <Checkbox />
                <Label className="text-xs">Sembunyikan nama</Label>
              </div>
            </div>
          </div>
        </div>

        <Button className="mt-auto">Kirim</Button>
      </form>
    </main>
  )
}
