import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/shared/components/ui/card"
import { Product } from "@/shared/model/product"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

type PerfumeItemProps = {
  perfume: Product
  children?: ReactNode
}

export default function PerfumeItem({ perfume, children }: PerfumeItemProps) {
  return (
    <Card className="flex flex-col p-2 sm:p-4 gap-2 h-full">
      <CardHeader className="p-0">
        <Link href={`${perfume.handle}`} className="relative block w-full">
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-md bg-secondary/10">
            <Image
              src={perfume.featuredImage.url}
              alt={perfume.title}
              fill
              loading="eager"
              sizes="(max-width: 640px) 100vw, 250px"
              className="object-contain transition-transform hover:scale-105 duration-300 p-2"
            />
          </div>
        </Link>
      </CardHeader>

      <CardContent className="flex flex-col items-center text-center p-2 mt-auto">
        <CardTitle className="text-base sm:text-lg line-clamp-2 min-h-12">
          {perfume.vendor} {perfume.title}
        </CardTitle>

        <span className="text-lg font-semibold mt-2">
          {perfume.priceRange.minVariantPrice.amount}{" "}
          {perfume.priceRange.minVariantPrice.currencyCode}
        </span>
      </CardContent>

      {children && (
        <CardFooter className="flex gap-2 items-center justify-center p-2">
          {children}
        </CardFooter>
      )}
    </Card>
  )
}
