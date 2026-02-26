"use server"
import { createClient } from "@/shared/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addToCart(productId: string, variantId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth")
  const { error } = await supabase.rpc("add_to_cart", {
    p_user_id: user.id,
    p_product_id: productId,
    p_variant_id: variantId,
    p_quantity: 1,
  })

  if (error) {
    console.error("Cart error:", error.message)
    throw new Error("Не удалось добавить товар")
  }

  revalidatePath("/cart")
}

/**
 * Обновление количества с валидацией
 */
export async function updateCartQuantity(
  productId: string,
  newQuantity: number,
) {
  // Валидация входных данных
  const quantity = Math.floor(newQuantity)
  if (isNaN(quantity)) throw new Error("Некорректное количество")

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Не авторизован")

  if (quantity <= 0) {
    return await removeFromCart(productId)
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("user_id", user.id)
    .eq("product_id", productId)

  if (error) throw new Error("Не удалось обновить корзину")

  revalidatePath("/cart")
}

/**
 * Удаление товара
 */
export async function removeFromCart(productId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Не авторизован")

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId)

  if (error) throw new Error("Ошибка при удалении")

  revalidatePath("/cart")
}
