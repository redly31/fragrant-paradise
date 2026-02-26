"use client"

import { useTransition } from "react"
import { startShopifyCheckout } from "./cart-checkout"
import { isRedirectError } from "next/dist/client/components/redirect-error"

export function useCheckout() {
  const [isPending, startTransition] = useTransition()

  const handleCheckout = () => {
    startTransition(async () => {
      try {
        await startShopifyCheckout()
      } catch (error: any) {
        if (isRedirectError(error)) {
          return
        }
        console.error("Checkout error:", error)
        alert(
          error?.message || "Не удалось оформить заказ. Попробуйте ещё раз.",
        )
      }
    })
  }

  return {
    handleCheckout,
    isPending,
  }
}
