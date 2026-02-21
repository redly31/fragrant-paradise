"use client"

import { Product } from "@/shared/model/product"
import { AddToCartButton } from "../cart/add-to-cart-button"
import { AddToFavoriteButton } from "../favorites/add-to-favorite-button"
import PerfumesList from "./ui/perfumes-list"
import { PerfumesFilters } from "./model/perfumes-filter"
import { useFilters } from "./model/use-filters"

export default function PerfumesListCatalog({
  perfumes,
}: {
  perfumes: Product[]
}) {
  const { searchQuery, setSearchQuery, setSortOption, displayedPerfumes } =
    useFilters(perfumes)

  return (
    <div>
      <PerfumesFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSortOption={setSortOption}
      />
      <PerfumesList<Product>
        items={displayedPerfumes}
        title="Каталог"
        renderFooter={(perfume) => (
          <>
            <AddToCartButton item={perfume} />
            <AddToFavoriteButton item={perfume} />
          </>
        )}
      />
    </div>
  )
}
