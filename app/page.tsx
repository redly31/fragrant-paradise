import { PerfumesListCatalog } from "@/features/perfumes-list"
import { getProducts } from "@/shared/lib/get-products"

export default async function Catalog() {
  const products = await getProducts()
  const perfumes = products
  if (perfumes.length === 0) {
    return <h1>Загрузка...</h1>
  }
  return <PerfumesListCatalog perfumes={perfumes} />
}
