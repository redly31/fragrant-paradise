"use client"

import { useState } from "react"
import { removeFromCart, updateCartQuantity } from "./cart-actions"
import { CartProduct } from "@/shared/model/product"

export function useCart(perfumes: CartProduct[]) {
  const [items, setItems] = useState<CartProduct[]>(perfumes)
  const handleUpdateQuantity = async (id: string, delta: number) => {
    const item = items.find((i) => i.id === id)
    if (!item) return

    const newQty = Math.max(1, item.quantity + delta)
    if (newQty === item.quantity) return
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)),
    )
    try {
      await updateCartQuantity(id, newQty)
    } catch (err) {
      setItems(perfumes)
    }
  }

  const handleRemove = async (id: string) => {
    const previousItems = [...items]
    setItems((prev) => prev.filter((i) => i.id !== id))

    try {
      await removeFromCart(id)
    } catch (err) {
      setItems(previousItems)
    }
  }

  const total = items.reduce(
    (sum, item) => sum + item.priceRange.minVariantPrice.amount * item.quantity,
    0,
  )

  return {
    items,
    total,
    handleRemove,
    handleUpdateQuantity,
  }
}
