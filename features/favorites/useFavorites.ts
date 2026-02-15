"use client"

import { useSyncExternalStore } from "react"
import { favoritesStore } from "./favorites-store"
import { Product } from "@/shared/model/product"

export const useFavorites = () => {
  const favorites = useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.getSnapshot,
    favoritesStore.getServerSnapshot,
  )

  const toggleFavorite = (product: Product) => {
    const isExist = favorites.some((item) => item.id === product.id)

    if (isExist) {
      favoritesStore.setState(
        favorites.filter((item) => item.id !== product.id),
      )
    } else {
      favoritesStore.setState([...favorites, product])
    }
  }

  const isFavorite = (productId: string) => {
    return favorites.some((item) => item.id === productId)
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  }
}
