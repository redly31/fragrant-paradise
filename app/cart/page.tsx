// app/cart/page.tsx
import { createClient } from "@/shared/supabase/server"
import { getProductsByIds } from "@/shared/lib/get-products-by-id"
import CartItemsList from "@/features/cart/cart-items-list"

export default async function CartPage() {
  const supabase = await createClient()

  const { data: dbItems } = await supabase
    .from("cart_items")
    .select("product_id, quantity, variant_id")

  if (!dbItems || dbItems.length === 0) {
    return <div className="p-10 text-center">Корзина пуста</div>
  }
  const ids = dbItems.map((item) => item.product_id)
  const shopifyProducts = await getProductsByIds(ids)
  const cartItems = dbItems
    .map((dbItem) => {
      const product = shopifyProducts.find((p) => p.id === dbItem.product_id)
      return {
        ...product!,
        quantity: dbItem.quantity,
      }
    })
    .filter((item) => item.id)

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Ваша корзина</h1>
      <CartItemsList initialItems={cartItems} />
    </main>
  )
}
