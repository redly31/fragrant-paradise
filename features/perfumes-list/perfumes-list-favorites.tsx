"use client"

import { AddToCartButton } from "../cart"
import { AddToFavoriteButton, useFavorites } from "../favorites"
import PerfumesList from "./ui/perfumes-list"

export function PerfumesListFavorites() {
  const { favorites } = useFavorites()
  return (
    <div>
      <PerfumesList
        items={favorites}
        title="Избранное"
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
