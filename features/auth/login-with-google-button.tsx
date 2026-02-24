import { Button } from "@/shared/components/ui/button"
import { signInWithGoogle } from "./actions"
import { LogIn } from "lucide-react"

export function LoginWithGoogleButton() {
  return (
    <form action={signInWithGoogle}>
      <Button>
        Войти с Google <LogIn />
      </Button>
    </form>
  )
}
