import { Product } from "../model/product"

export function mapToProduct(raw: ShopifyRawProduct): Product {
  return {
    id: raw.id,
    title: raw.title,
    handle: raw.handle,
    vendor: raw.vendor,
    description: raw.description,
    availableForSale: raw.availableForSale,
    priceRange: {
      minVariantPrice: {
        amount: parseFloat(raw.priceRange.minVariantPrice.amount),
        currencyCode: raw.priceRange.minVariantPrice.currencyCode,
      },
    },
    featuredImage: {
      url: raw.featuredImage.url,
    },
    target_gender: {
      value: raw.target_gender?.value || "Universal",
    },
    season: {
      value: raw.season?.value || "All Season",
    },
    variantId:
      raw.variants.nodes?.[0]?.id || raw.variants.edges?.[0]?.node?.id || "",
  }
}
