"use client"
import { Button } from "@/shared/components/ui/button"
import { useFavorites } from "./useFavorites"
import { Product } from "@/shared/model/product"
import { Heart } from "lucide-react"

export function AddToFavoriteButton({ item }: { item: Product }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const active = isFavorite(item.id)

  return (
    <Button variant="outline" onClick={() => toggleFavorite(item)}>
      {active ? (
        <Heart color="red" fill="red" className="h-4 w-4" />
      ) : (
        <Heart className="h-4 w-4" />
      )}
    </Button>
  )
}
