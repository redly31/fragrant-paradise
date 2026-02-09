// app/favorites/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Heart, ShoppingCart, Trash } from "lucide-react"

interface Perfume {
  id: string
  name: string
  volume: string
  price: number
  discountPrice?: number
  subtitle?: string
  image: string
}

// Realistic mock data with real image URLs
const mockFavorites: Perfume[] = [
  {
    id: "1",
    name: "Chanel No. 5",
    volume: "100ml",
    price: 150,
    discountPrice: 120,
    subtitle: "Timeless floral fragrance",
    image:
      "https://thumbs.dreamstime.com/b/chanel-no-flower-background-117788510.jpg",
  },
  {
    id: "4",
    name: "Tom Ford Oud Wood",
    volume: "100ml",
    price: 250,
    subtitle: "Exotic oriental scent",
    image:
      "https://media.vogue.co.uk/photos/5da0aa9a0a850300087e838d/16:9/w_1280,c_limit/GU641_BLOOM%20AMBROSIA_BTS_Press_Crops_300dpi_03.jpg", // Placeholder, replace with actual if needed
  },
  {
    id: "6",
    name: "Creed Aventus",
    volume: "100ml",
    price: 300,
    subtitle: "Fruity and smoky",
    image:
      "https://www.dior.com/dw/image/v2/BGJL_PRD/on/demandware.static/-/Sites-master_dior/default/dw6f2b1a2b/Y0997009/Y0997009_F099724009_E01_GHC.jpg", // Placeholder, replace with actual
  },
]

const Favorites = () => {
  const [favorites, setFavorites] = useState<Perfume[]>(mockFavorites)

  const removeFromFavorites = (id: string) => {
    setFavorites((items) => items.filter((item) => item.id !== id))
  }

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
              <img
                src={perfume.image}
                alt={perfume.name}
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="font-semibold text-lg">{perfume.name}</h3>
              <p className="text-sm text-muted-foreground">{perfume.volume}</p>
              {perfume.subtitle && (
                <p className="text-xs text-muted-foreground mb-2">
                  {perfume.subtitle}
                </p>
              )}
              <div className="flex items-center space-x-2 mb-2">
                {perfume.discountPrice ? (
                  <>
                    <span className="text-lg font-bold">
                      ${perfume.discountPrice}
                    </span>
                    <span className="text-sm line-through text-muted-foreground">
                      ${perfume.price}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold">${perfume.price}</span>
                )}
              </div>
              <div className="flex space-x-2 mt-auto">
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeFromFavorites(perfume.id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeFromFavorites(perfume.id)}
                >
                  <Trash className="h-4 w-4" />
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
