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
    <Card className="flex justify-between flex-col p-2 sm:p-4 gap-2">
      <CardHeader>
        <Link href={`${perfume.handle}`}>
          <Image
            src={perfume.featuredImage.url}
            alt={perfume.title}
            width={230}
            height={480}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            loading="eager"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center p-0 sm:p-4">
        <CardTitle className="text-lg line-clamp-2">
          {perfume.vendor} {perfume.title}
        </CardTitle>

        <span className="text-lg mt-2">
          {perfume.priceRange.minVariantPrice.amount}{" "}
          {perfume.priceRange.minVariantPrice.currencyCode}
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
