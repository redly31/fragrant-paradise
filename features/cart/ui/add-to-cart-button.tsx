"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Product } from "@/shared/model/product"
import { ShoppingCart, Loader2 } from "lucide-react"
import { addToCart } from "../model/cart-actions"
import { toast } from "sonner"

export function AddToCartButton({ item }: { item: Product }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async () => {
    setIsLoading(true)

    toast.promise(addToCart(item.id, item.variantId), {
      loading: "Добавление...",
      success: "Товар добавлен в корзину",
      error: "Не удалось добавить товар",
    })

    setIsLoading(false)
  }

  return (
    <Button
      aria-label={"Добавить товар в корзину"}
      size={"lg"}
      variant="outline"
      onClick={handleAdd}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
    </Button>
  )
}
