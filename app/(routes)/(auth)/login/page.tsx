import LoginForm from '@/routes/(auth)/login/form'
import NavigationButton from '@/app/_components/ui/navigation-button'

export default function LoginPage() {
  return (
    <main className="flex h-dvh flex-col gap-8 p-8">
      <div className="flex w-full items-center justify-between">
        <NavigationButton type="BACK" />
        <span className="text-sm font-semibold text-primary/30">TiresQ</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Selamat datang! 👋</h1>
        <p className="text-sm font-light text-muted-foreground">
          Masukkan email dan kata sandi kamu untuk dapatkan akses ke akunmu
        </p>
      </div>

      <LoginForm />
    </main>
  )
}
