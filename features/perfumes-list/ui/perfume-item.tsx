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
  description: boolean
}

export default function PerfumeItem({
  perfume,
  children,
  description,
}: PerfumeItemProps) {
  return (
    <Card className="flex justify-between flex-col">
      <CardHeader>
        <Link
          href={`${perfume.handle}`}
          className="relative w-full h-72 block overflow-hidden"
        >
          <Image
            src={perfume.featuredImage.url}
            alt={perfume.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <CardTitle className="text-lg line-clamp-2">
          {perfume.vendor} {perfume.title}
        </CardTitle>

        {description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {perfume.description}
          </p>
        )}
        <span className="text-lg mt-4">
          ${perfume.priceRange.minVariantPrice.amount}
        </span>
      </CardContent>
      {children && (
        <CardFooter className="flex gap-2 items-center justify-center">
          {children}
        </CardFooter>
      )}
    </Card>
  )
}
