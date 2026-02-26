import { useState, useMemo, useEffect } from "react"
import { Product } from "@/shared/model/product"

export type SortOption = "price-asc" | "price-desc" | "popularity" | "name-asc"

export function useFilters(perfumes: Product[]) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [debouncedQuery, setDebouncedQuery] = useState<string>(searchQuery)
  const [sortOption, setSortOption] = useState<SortOption>("popularity")
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

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

    return sorted.filter(
      (perfume) =>
        perfume.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        perfume.vendor.toLowerCase().includes(debouncedQuery.toLowerCase()),
    )
  }, [perfumes, debouncedQuery, sortOption])

  return {
    searchQuery,
    setSearchQuery,
    setSortOption,
    displayedPerfumes,
  }
}
