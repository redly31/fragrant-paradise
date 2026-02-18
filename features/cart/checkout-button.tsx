"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Loader2, CircleDollarSign } from "lucide-react"
import { startShopifyCheckout } from "./checkout"

export function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async () => {
    setIsLoading(true)
    try {
      await startShopifyCheckout()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="flex items-center mt-4"
      size={"lg"}
      onClick={handleAdd}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>К оплате</>}
    </Button>
  )
}
