"use client"

import { Button } from "@/shared/components/ui/button"
import { AddToCartButton } from "../cart"
import { AddToFavoriteButton, useFavorites } from "../favorites"
import PerfumesList from "./ui/perfumes-list"
import Link from "next/link"

export function PerfumesListFavorites() {
  const { favorites } = useFavorites()
  if (favorites.length === 0)
    return (
      <div className="flex justify-center flex-col items-center">
        <div className="text-2xl font-bold text-center">
          Вы не добавили <br />
          товары в избранное :(
        </div>
        <Button asChild className="mt-4">
          <Link href={"/"}>На главную</Link>
        </Button>
      </div>
    )

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
