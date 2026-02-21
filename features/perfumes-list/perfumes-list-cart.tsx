"use client"

import PerfumesList from "./ui/perfumes-list"
import RemoveFromCartButton from "../cart/remove-from-cart-button"
import UpdateQuantityButtons from "../cart/update-quantity-buttons"
import useCart from "../cart/useCart"
import { CartProduct } from "@/shared/model/product"
import { CheckoutButton } from "../cart/checkout-button"

export default function PerfumesListCart({
  perfumes,
}: {
  perfumes: CartProduct[]
}) {
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
        <h2 className="text-xl font-bold mb-4">Итого</h2>
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
