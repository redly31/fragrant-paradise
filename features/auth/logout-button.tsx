import { Button } from "@/shared/components/ui/button"
import { signOut } from "./actions"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <form action={signOut}>
      <Button>
        Выйти <LogOut />
      </Button>
    </form>
  )
}
