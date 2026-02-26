"use client"

import PerfumesList from "./ui/perfumes-list"
import { CartProduct } from "@/shared/model/product"
import {
  useCart,
  RemoveFromCartButton,
  UpdateQuantityButtons,
  CheckoutButton,
} from "../cart"
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/shared/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function PerfumesListCart({ perfumes }: { perfumes: CartProduct[] }) {
  const { handleRemove, handleUpdateQuantity, items, total } = useCart(perfumes)
  return (
    <div>
      <PerfumesList<CartProduct>
        items={items}
        title="Корзина"
        renderFooter={(perfume: CartProduct) => (
          <>
            <RemoveFromCartButton item={perfume} handleRemove={handleRemove} />
            <UpdateQuantityButtons
              item={perfume}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          </>
        )}
      />
      <div className="border rounded-lg p-6 h-fit mt-5">
        <Alert className="">
          <AlertTitle>Оплата для тестирования</AlertTitle>
          <AlertDescription>Пароль: 12345</AlertDescription>
        </Alert>
        <h2 className="text-xl font-bold my-4 ">Итого</h2>
        <div className="flex justify-between mb-2">
          <span>Товары ({perfumes.length})</span>
          <span>
            {total.toFixed(2)}{" "}
            {perfumes[0]?.priceRange.minVariantPrice.currencyCode}
          </span>
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>К оплате</span>
            <span>
              {total.toFixed(2)}{" "}
              {perfumes[0]?.priceRange.minVariantPrice.currencyCode}
            </span>
          </div>
        </div>
        <CheckoutButton />
      </div>
    </div>
  )
}
