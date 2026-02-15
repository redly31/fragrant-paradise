import { Badge } from "@/shared/components/ui/badge"
import { getProduct } from "@/shared/lib/get-product"
import Image from "next/image"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ handle: string }>
}

export default async function PerfumePage({ params }: Props) {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.title}
            width={375}
            height={500}
            className="rounded-lg shadow-md"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.vendor}</p>
          <p className="text-2xl font-semibold mb-6">
            {product.priceRange.minVariantPrice.amount}{" "}
            {product.priceRange.minVariantPrice.currencyCode}
          </p>
          <div className="prose mb-6">{product.description}</div>
          <div className="flex gap-2">
            <Badge>{product.target_gender?.value}</Badge>
            <Badge>{product.season?.value}</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
