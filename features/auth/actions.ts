"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { createClient } from "@/shared/supabase/server"
import { revalidatePath } from "next/cache"

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
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
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Ошибка при выходе:", error.message)
    return
  }
  revalidatePath("/", "layout")
  redirect("/")
}
