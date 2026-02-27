import { Badge } from "@/shared/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { getProduct } from "@/shared/lib/get-product"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

export const revalidate = 3600

interface Props {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${product.title} by ${product.vendor}`,
    description: product.description,
    openGraph: {
      title: `${product.title} by ${product.vendor}`,
      description: product.description,
      images: product.featuredImage?.url
        ? [{ url: product.featuredImage.url }]
        : undefined,
      type: "website",
    },
  }
}

export default async function PerfumePage({ params }: Props) {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.featuredImage?.url || undefined,
    description: product.description || "",
    sku: product.handle,
    brand: {
      "@type": "Brand",
      name: product.vendor,
    },
    offers: {
      "@type": "Offer",
      url: `https://your-site.com/perfume/${product.handle}`,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      price: product.priceRange.minVariantPrice.amount,
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              width={350}
              height={550}
              priority
              className="w-auto h-auto rounded-lg object-cover"
            />
          )}
          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl">{product.title}</CardTitle>
              <CardDescription>{product.vendor}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="mb-6 mt-4 text-2xl font-semibold">
                {product.priceRange.minVariantPrice.amount}{" "}
                {product.priceRange.minVariantPrice.currencyCode}
              </p>
              <div className="prose mb-6">{product.description}</div>
              <div className="flex gap-2">
                <Badge>{product.target_gender?.value}</Badge>
                <Badge>{product.season?.value}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
