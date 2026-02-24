import { mapToProduct } from "./map-to-product"
import { shopifyFetch } from "./shopify"

export async function getProducts() {
  const query = `
    query GetPerfumes {
      products(first: 10) {
        edges {
          node {
            id
            title
            vendor
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            description
            availableForSale
            variants(first: 1) {
              edges {
                node {
                  id
                }
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
          }
        }
      }
  } 
`

  const response = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyRawProduct }> }
  }>({ query })

  return response.data.products.edges.map((edge) => mapToProduct(edge.node))
}
