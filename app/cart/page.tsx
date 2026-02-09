"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Trash } from "lucide-react"

interface Perfume {
  id: string
  name: string
  volume: string
  price: number
  discountPrice?: number
  subtitle?: string
  image: string
}

interface CartItem extends Perfume {
  quantity: number
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Chanel No. 5",
    volume: "100ml",
    price: 150,
    discountPrice: 120,
    subtitle: "Timeless floral fragrance",
    image:
      "https://thumbs.dreamstime.com/b/chanel-no-flower-background-117788510.jpg",
    quantity: 1,
  },
  {
    id: "2",
    name: "Dior Sauvage",
    volume: "100ml",
    price: 130,
    subtitle: "Fresh and woody notes",
    image:
      "https://www.dior.com/dw/image/v2/BGJL_PRD/on/demandware.static/-/Sites-master_dior/default/dw6f2b1a2b/Y0997009/Y0997009_F099724009_E01_GHC.jpg",
    quantity: 2,
  },
  {
    id: "3",
    name: "Gucci Bloom",
    volume: "50ml",
    price: 90,
    discountPrice: 75,
    image:
      "https://media.vogue.co.uk/photos/5da0aa9a0a850300087e838d/16:9/w_1280,c_limit/GU641_BLOOM%20AMBROSIA_BTS_Press_Crops_300dpi_03.jpg",
    quantity: 1,
  },
]

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const calculateSubtotal = (item: CartItem) => {
    const price = item.discountPrice || item.price
    return price * item.quantity
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0)
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col w-[350px]  md:w-full md:flex-row items-start md:items-center md:justify-between border rounded-lg p-4 gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.volume}</p>
                  {item.subtitle && (
                    <p className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    {item.discountPrice ? (
                      <>
                        <span className="text-lg font-bold">
                          ${item.discountPrice}
                        </span>
                        <span className="text-sm line-through text-muted-foreground">
                          ${item.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">${item.price}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    className="w-16 text-center"
                    readOnly
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </Button>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    ${calculateSubtotal(item).toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>${calculateTotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${calculateTotal().toFixed(2)}</p>
            </div>
            <Button className="w-full mt-4">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  )
}
