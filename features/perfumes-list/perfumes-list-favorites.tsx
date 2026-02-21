"use client"

import { AddToCartButton } from "../cart/add-to-cart-button"
import { AddToFavoriteButton } from "../favorites/add-to-favorite-button"
import PerfumesList from "./ui/perfumes-list"
import { useFavorites } from "../favorites/useFavorites"

export default function PerfumesListFavorites() {
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
