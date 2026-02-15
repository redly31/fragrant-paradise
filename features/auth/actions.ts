"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { createClient } from "@/shared/supabase/server"

export async function signInWithGoogle() {
  const supabase = await createClient()
  const origin = (await headers()).get("origin")

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
    return redirect("/error")
  }

  return redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/auth")
}
