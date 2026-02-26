import { createClient } from "@/shared/supabase/server"
import { getProductsByIds } from "@/shared/lib/get-products-by-id"
import { PerfumesListCart } from "@/features/perfumes-list"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"

export default async function CartPage() {
  const supabase = await createClient()

  const { data: dbItems } = await supabase
    .from("cart_items")
    .select("product_id, quantity, variant_id")

  if (!dbItems || dbItems.length === 0) {
    return (
      <>
        <div className="text-2xl font-bold">Корзина пуста :(</div>
        <Button asChild className="mt-4">
          <Link href={"/"}>На главную</Link>
        </Button>
      </>
    )
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
  return <PerfumesListCart perfumes={cartItems} />
}
