export type Product = {
  availableForSale: boolean
  description: string
  featuredImage: {
    url: string
  }
  handle: string
  id: string
  season: {
    value: string
  }
  target_gender: {
    value: string
  }
  priceRange: {
    minVariantPrice: {
      amount: number
      currencyCode: string
    }
  }
  title: string
  vendor: string
}
