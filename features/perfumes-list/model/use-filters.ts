import { useState, useMemo } from "react"
import { Product } from "@/shared/model/product"

export type SortOption = "price-asc" | "price-desc" | "popularity" | "name-asc"

export function useFilters(perfumes: Product[]) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOption, setSortOption] = useState<SortOption>("popularity")

  const displayedPerfumes = useMemo(() => {
    const sorted = [...perfumes].sort((a, b) => {
      if (sortOption === "price-asc")
        return (
          a.priceRange.minVariantPrice.amount -
          b.priceRange.minVariantPrice.amount
        )
      if (sortOption === "price-desc")
        return (
          b.priceRange.minVariantPrice.amount -
          a.priceRange.minVariantPrice.amount
        )
      if (sortOption === "name-asc") return a.title.localeCompare(b.title)
      return 0
    })

    return sorted.filter((perfume) =>
      perfume.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [perfumes, searchQuery, sortOption])

  return {
    searchQuery,
    setSearchQuery,
    setSortOption,
    displayedPerfumes,
  }
}
