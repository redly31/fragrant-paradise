"use server"

import { shopifyFetch } from "@/shared/lib/shopify"
import { createClient } from "@/shared/supabase/server"
import { redirect } from "next/navigation"

type ShopifyUserError = {
  field: string[]
  message: string
}

type CartCreatePayload = {
  cart: {
    checkoutUrl: string | null
  } | null
  userErrors: ShopifyUserError[]
}

type CartCreateResponse = {
  data: {
    cartCreate: CartCreatePayload | null
  } | null
  errors?: Array<{ message: string }>
}

export async function startShopifyCheckout() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error("Пользователь не авторизован")
  }

  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select("variant_id, quantity")
    .eq("user_id", user.id)

  if (error) {
    console.error("Ошибка Supabase при получении корзины:", error)
    throw new Error("Не удалось загрузить корзину")
  }

  if (!cartItems?.length) {
    throw new Error("Корзина пуста")
  }

  const invalidItems = cartItems.filter((item) => !item.variant_id)
  if (invalidItems.length > 0) {
    console.error("❌ Товары без variant_id:", invalidItems)
    throw new Error(
      "Некоторые товары в корзине без варианта. Очистите корзину и добавьте заново.",
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

  const response = (await shopifyFetch({
    query,
    variables: { lines },
  })) as CartCreateResponse

  if (response.errors?.length) {
    console.error("GraphQL Errors:", response.errors)
    throw new Error(response.errors[0].message)
  }

  const cartCreate = response.data?.cartCreate

  if (cartCreate?.userErrors?.length) {
    throw new Error(cartCreate.userErrors[0].message)
  }

  const checkoutUrl = cartCreate?.cart?.checkoutUrl

  if (!checkoutUrl) {
    console.error("Полный ответ Shopify:", JSON.stringify(response, null, 2))
    throw new Error("Не удалось сформировать ссылку на оплату")
  }

  const { error: deleteError } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id)

  if (deleteError) {
    console.error("⚠️ Не удалось очистить корзину после чекаута:", deleteError)
  }

  redirect(checkoutUrl)
}
