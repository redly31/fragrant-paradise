import { LoginWithGoogleButton } from "@/features/auth"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card"

const Auth = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-12 px-4">
      <Card className="w-full max-w-100 shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Вход
          </CardTitle>
          <CardDescription>Для продолжения необходимо войти</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-full h-px bg-border my-2" />

          <div className="flex w-full justify-center">
            <LoginWithGoogleButton />
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Только официальная авторизация Google
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Auth
