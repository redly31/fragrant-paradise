import { createClient } from "@/shared/supabase/server"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }
  return <>{children}</>
}
