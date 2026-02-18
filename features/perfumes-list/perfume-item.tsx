import { Product } from "@/shared/model/product"
import Image from "next/image"
import Link from "next/link"
import { FavoriteButton } from "../favorites/favorites-button"
import { AddToCartButton } from "../cart/add-to-cart-button"

type PerfumeItemProps = {
  perfume: Product
}

export default function PerfumeItem(props: PerfumeItemProps) {
  const { perfume } = props
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center">
      <div className="relative w-full h-72 mb-2">
        <Link href={`${perfume.handle}`}>
          <Image
            src={perfume.featuredImage.url}
            alt={perfume.title}
            fill
            className="object-cover"
          />
        </Link>
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
        <FavoriteButton product={perfume} />
        <AddToCartButton product={perfume} />
      </div>
    </div>
  )
}
