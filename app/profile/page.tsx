import { Card, CardContent } from "@/shared/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import { Calendar } from "lucide-react"
import { createClient } from "@/shared/supabase/server"
import { redirect } from "next/navigation"
import { LogoutButton } from "@/features/auth"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border">
              <AvatarImage
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.name}
              />
              <AvatarFallback>
                {user.user_metadata.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold tracking-tight">
                {user.user_metadata.name}
              </h1>
              <p className="text-muted-foreground">
                {user.user_metadata.email}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  На сайте с{" "}
                  {new Date(user.created_at).toLocaleDateString("ru-RU")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <LogoutButton />
    </div>
  )
}
