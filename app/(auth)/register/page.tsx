import RegisterForm from '@/app/(auth)/register/form'
import RegisterFormDev from '@/app/(auth)/register/form.dev'
import NavigationButton from '@/components/ui/navigation-button'

export default function RegisterPage() {
  return (
    <main className="flex h-[100dvh] flex-col p-8">
      <div className="flex w-full items-center justify-between">
        <NavigationButton type="BACK" />
        <span className="text-sm font-semibold text-primary/30">TiresQ</span>
      </div>

      <div className="my-8 space-y-3">
        <h1 className="text-2xl font-bold">Yuk daftar sekarang!</h1>
        <p className="text-sm font-light text-muted-foreground">
          Masukkan email dan kata sandi kamu untuk dapetin akun baru kamu
        </p>
      </div>

      {process.env.NODE_ENV === 'development' && <RegisterFormDev />}
      {process.env.NODE_ENV === 'production' && <RegisterForm />}
    </main>
  )
}
