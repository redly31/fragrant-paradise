import { Button } from "@/shared/components/ui/button"
import { signInWithGoogle } from "./actions"
import { LogIn } from "lucide-react"

export default function LoginWithGoogle() {
  return (
    <form action={signInWithGoogle}>
      <Button>
        Sign in with Google <LogIn />
      </Button>
    </form>
  )
}
