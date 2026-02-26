"use client"

import { Button } from "@/shared/components/ui/button"
import { Loader2 } from "lucide-react"
import { useCheckout } from "../model/use-checkout"

export function CheckoutButton() {
  const { handleCheckout, isPending } = useCheckout()

  return (
    <Button
      variant="outline"
      size="lg"
      className="mt-4 w-full"
      onClick={handleCheckout}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Перенаправляем на оплату...
        </>
      ) : (
        "К оплате"
      )}
    </Button>
  )
}
