import { Product } from "../model/product"
import { mapToProduct } from "./map-to-product"
import { shopifyFetch } from "./shopify"
import { ShopifyRawProduct } from "./types"

export async function getProduct(handle: string): Promise<Product | null> {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        vendor
        handle
        description
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            id
          }
        }
        featuredImage {
          url
          altText
        }
        target_gender: metafield(namespace: "custom", key: "target-gender") {
          value
        }
        season: metafield(namespace: "custom", key: "season") {
          value
        }
      }
    }
  `

  const response = await shopifyFetch<{ product: ShopifyRawProduct | null }>({
    query,
    variables: { handle },
  })

  return response.data.product ? mapToProduct(response.data.product) : null
}
