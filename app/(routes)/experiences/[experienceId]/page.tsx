import { Star } from 'lucide-react';
import { notFound } from 'next/navigation'
import { Button } from '@/app/_components/ui/button'
import { Checkbox } from '@/app/_components/ui/checkbox'
import { Label } from '@/app/_components/ui/label'
import NavigationButton from '@/app/_components/ui/navigation-button'
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
        <NavigationButton type="CLOSE" url="/histories" />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-base font-bold">{history.name}</h1>
          <p className="text-xs font-light">{history.createdAt}</p>
        </div>
      </div>

      <form className="flex h-full flex-col justify-center">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-semibold">Bagaimana pelayanannya?</p>
          <div className="flex gap-5">
            {Array.from({ length: 5 }, (_, i) => i++).map((index) => (
              <div key={index} className="relative">
                <div className="peer z-10 size-7 opacity-0">
                  <Checkbox className='w-full h-full' />
                </div>
                <Star className="absolute left-1/2 top-1/2 -z-10 size-7 -translate-x-1/2 -translate-y-1/2 fill-muted-foreground stroke-muted-foreground peer-has-[:checked]:fill-yellow-200 peer-has-[:checked]:stroke-yellow-500" />
              </div>
            ))}
          </div>
          <span className="text-sm font-semibold">Keterangan</span>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-semibold text-center">
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