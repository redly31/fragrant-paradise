"use client"

import { useState } from "react"
import { Product } from "@/shared/model/product"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Minus, Plus, Trash } from "lucide-react"
import Image from "next/image"
import { removeFromCart, updateCartQuantity } from "./actions"
import Link from "next/link"
import { CheckoutButton } from "./checkout-button"

interface CartItem extends Product {
  quantity: number
}

export default function CartItemsList({
  initialItems,
}: {
  initialItems: CartItem[]
}) {
  const [items, setItems] = useState<CartItem[]>(initialItems)

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
      setItems(initialItems)
      alert("Не удалось обновить количество")
    }
  }

  const handleRemove = async (id: string) => {
    const previousItems = [...items]
    setItems((prev) => prev.filter((i) => i.id !== id))

    try {
      await removeFromCart(id)
    } catch (err) {
      setItems(previousItems)
      alert("Не удалось удалить товар")
    }
  }

  const total = items.reduce(
    (sum, item) => sum + item.priceRange.minVariantPrice.amount * item.quantity,
    0,
  )

  if (items.length === 0)
    return <p className="text-center py-10">Корзина пуста</p>
  console.log(items)
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col w-87.5 md:w-full items-center border rounded-lg p-4 gap-4"
          >
            <Image
              src={item.featuredImage.url}
              alt={item.title}
              width={375}
              height={500}
              className="object-cover rounded"
            />

            <div className="flex items-center flex-col">
              <h3 className="font-semibold text-lg">{item.title}</h3>

              <div className="flex items-center space-x-2 mt-2">
                <span className="text-lg font-bold">
                  ${item.priceRange.minVariantPrice.amount}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Input
                className="w-12 text-center"
                value={item.quantity}
                readOnly
              />

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQuantity(item.id, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleRemove(item.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="border rounded-lg p-6 h-fit  mt-5">
        <h2 className="text-xl font-bold mb-4">Итого</h2>
        <div className="flex justify-between mb-2">
          <span>Товары ({items.length})</span>
          <span>
            {total.toFixed(2)}{" "}
            {items[0]?.priceRange.minVariantPrice.currencyCode}
          </span>
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>К оплате</span>
            <span>
              {total.toFixed(2)}{" "}
              {items[0]?.priceRange.minVariantPrice.currencyCode}
            </span>
          </div>
        </div>
        <CheckoutButton />
        {/* <Button className="w-full mt-6" size="lg" asChild>
          <Link href={"/checkout"}>Оформить заказ</Link>
        </Button> */}
      </div>
    </div>
  )
}
