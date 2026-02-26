// Тип того, что ПРИХОДИТ из Shopify API
export interface ShopifyRawProduct {
  id: string
  title: string
  handle: string
  vendor: string
  description: string
  availableForSale: boolean
  priceRange: {
    minVariantPrice: {
      amount: string // В API это всегда строка
      currencyCode: string
    }
  }
  featuredImage: {
    url: string
    altText?: string
  }
  target_gender: { value: string } | null
  season: { value: string } | null
  variants: {
    nodes?: Array<{ id: string }>
    edges?: Array<{ node: { id: string } }>
  }
}

export interface ShopifyError {
  message: string
  locations?: Array<{
    line: number
    column: number
  }>
  path?: Array<string | number>
  extensions?: {
    code?: string
    [key: string]: unknown
  }
}
