"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Product } from "@/shared/model/product"
import { ShoppingCart, Loader2 } from "lucide-react"
import { addToCart } from "./actions"

export function AddToCartButton({ item }: { item: Product }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async () => {
    setIsLoading(true)
    try {
      console.log(item)
      await addToCart(item.id, item.variantId)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleAdd} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
    </Button>
  )
}
