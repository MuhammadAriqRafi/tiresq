import ResetPasswordForm from '@/app/(auth)/password/edit/_components/reset-password-form'

export default function ResetPasswordPage() {
  return (
    <main className="flex h-dvh flex-col gap-8 p-8">
      <span className="text-sm font-semibold text-primary/30">TiresQ</span>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Buat password baru</h1>
        <p className="text-sm font-light text-muted-foreground">
          Masukkan password baru kamu
        </p>
      </div>
      <ResetPasswordForm />
    </main>
  )
}
