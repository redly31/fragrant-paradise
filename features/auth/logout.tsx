import { Button } from "@/shared/components/ui/button"
import { signOut } from "./actions"
import { LogOut } from "lucide-react"

export default function Logout() {
  return (
    <form action={signOut}>
      <Button>
        Sign out <LogOut />
      </Button>
    </form>
  )
}
