"use client"
import { Button } from "@/shared/components/ui/button"
import { useFavorites } from "./useFavorites"
import { Product } from "@/shared/model/product"
import { Heart } from "lucide-react"
import { toast } from "sonner"

export function AddToFavoriteButton({ item }: { item: Product }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const active = isFavorite(item.id)

  const handleClick = () => {
    const wasActive = isFavorite(item.id)

    toggleFavorite(item)

    toast(wasActive ? "Удален из избранного" : "Добавлен в избранное ❤️")
  }

  return (
    <Button
      aria-label={active ? "Удалить из избранного" : "Добавить в избранное"}
      size={"lg"}
      variant="outline"
      onClick={handleClick}
    >
      {active ? (
        <Heart color="red" fill="red" className="h-4 w-4" />
      ) : (
        <Heart className="h-4 w-4" />
      )}
    </Button>
  )
}
