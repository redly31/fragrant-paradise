"use server"
import { createClient } from "@/shared/supabase/server"
import { revalidatePath } from "next/cache"
import { cache } from "react"

export const getCartItems = cache(async () => {
  const supabase = await createClient()
  const { data } = await supabase
    .from("cart_items")
    .select("product_id, quantity, variant_id")
  return data ?? []
})

export async function addToCart(productId: string, variantId: string) {
  const supabase = await createClient()

  const { error } = await supabase.rpc("add_to_cart", {
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
  const quantity = Math.floor(newQuantity)
  if (isNaN(quantity)) throw new Error("Некорректное количество")

  const supabase = await createClient()

  if (quantity <= 0) {
    return await removeFromCart(productId)
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("product_id", productId)

  if (error) throw new Error("Не удалось обновить корзину")

  revalidatePath("/cart")
}

/**
 * Удаление товара
 */
export async function removeFromCart(productId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("product_id", productId)

  if (error) throw new Error("Ошибка при удалении")

  revalidatePath("/cart")
}
