"use server"

import { shopifyFetch } from "@/shared/lib/shopify"
import { createClient } from "@/shared/supabase/server"
import { redirect } from "next/navigation"

export async function startShopifyCheckout() {
  const supabase = await createClient()

  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select("variant_id, quantity")

  if (error || !cartItems?.length) {
    throw new Error("Корзина пуста или произошла ошибка")
  }

  console.log("123", cartItems)
  const invalidItems = cartItems.filter((item) => !item.variant_id)
  if (invalidItems.length > 0) {
    console.error("❌ В корзине товары без variant_id:", invalidItems)
    throw new Error(
      `Некоторые товары в корзине без варианта (variant_id = null). Очисти корзину и добавь заново.`,
    )
  }

  const query = `
    mutation createCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const lines = cartItems.map((item) => ({
    merchandiseId: item.variant_id,
    quantity: item.quantity,
  }))

  const response = await shopifyFetch({
    query,
    variables: { lines },
  })

  if (!response || !response.data) {
    console.error(
      "Критическая ошибка: Shopify API вернул пустой ответ или null",
    )
    throw new Error("Ошибка связи с Shopify")
  }

  if (response.errors) {
    console.error("❌ GraphQL Errors:", response.errors)
    throw new Error(response.errors[0].message)
  }

  const userErrors = response.data?.cartCreate?.userErrors
  if (userErrors && userErrors.length > 0) {
    console.error("Shopify Checkout Error:", userErrors)
    throw new Error(userErrors[0].message)
  }

  if (userErrors?.length > 0) {
    console.error("❌ User Errors:", userErrors)
    throw new Error(userErrors[0].message)
  }

  const checkoutUrl = response.data?.cartCreate?.cart?.checkoutUrl

  if (!checkoutUrl) {
    console.log(
      "🔍 Полный ответ Shopify для отладки:",
      JSON.stringify(response.data, null, 2),
    )
    throw new Error("Не удалось сформировать ссылку (пустой результат)")
  }

  redirect(checkoutUrl)
}
