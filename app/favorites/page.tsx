"use client"

import { Button } from "@/shared/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import { useFavorites } from "@/features/favorites/useFavorites"
import Image from "next/image"

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Избранное</h1>

      {favorites.length === 0 ? (
        <p>Your favorites list is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((perfume) => (
            <div
              key={perfume.id}
              className="border rounded-lg p-4 flex flex-col items-center"
            >
              <div className="relative w-full h-72 mb-2">
                <Image
                  src={perfume.featuredImage.url}
                  alt={perfume.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-semibold text-lg">{perfume.title}</h3>
              {perfume.description && (
                <p className="text-xs text-muted-foreground mb-2 mt-2">
                  {perfume.description}
                </p>
              )}
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-bold">
                  ${perfume.priceRange.minVariantPrice.amount}
                </span>
              </div>
              <div className="flex space-x-2 mt-auto">
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleFavorite(perfume)}
                >
                  {isFavorite(perfume.id) ? (
                    <Heart className="h-4 w-4" color="red" fill="red" />
                  ) : (
                    <Heart className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
