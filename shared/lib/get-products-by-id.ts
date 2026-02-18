import { Product } from "../model/product"
import { shopifyFetch } from "./shopify"

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return []

  const query = `
    query GetProductsByIds($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          id
          title
          handle
          vendor
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
          }
          target_gender: metafield(namespace: "custom", key: "target-gender") {
            value
          }
          season: metafield(namespace: "custom", key: "season") {
            value
          }
          variants(first: 1) {
            nodes {
              id
            }
          }
        }
      }
    }
  `

  const response = await shopifyFetch({
    query,
    variables: { ids },
  })

  return response.data.nodes
    .filter((node: any) => node !== null)
    .map((node: any) => ({
      ...node,
      variantId: node.variants.nodes[0]?.id,
    }))
}
