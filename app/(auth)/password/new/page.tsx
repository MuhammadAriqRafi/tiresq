import ForgotPasswordForm from '@/app/(auth)/password/new/_components/forgot-password-form'
import NavigationButton from '@/components/ui/navigation-button'

export default function ForgotPasswordPage() {
  return (
    <main className="flex h-dvh flex-col gap-8 p-8">
      <div className="flex w-full items-center justify-between">
        <NavigationButton type="BACK" />
        <span className="text-sm font-semibold text-primary/30">TiresQ</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Reset password kamu</h1>
        <p className="text-sm font-light text-muted-foreground">
          Masukkan email kamu untuk dapatkan link reset password akunmu
        </p>
      </div>
      <ForgotPasswordForm />
    </main>
  )
}
