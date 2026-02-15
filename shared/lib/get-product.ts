import { Product } from "../model/product"
import { shopifyFetch } from "./shopify"

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

  const response = await shopifyFetch({
    query,
    variables: { handle },
  })

  return response.data.product
}
