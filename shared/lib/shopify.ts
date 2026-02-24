import { ShopifyError } from "./types"

export interface ShopifyResponse<T> {
  data: T
  errors?: ShopifyError[]
}

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<ShopifyResponse<T>> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!domain || !accessToken) {
    throw new Error(
      "❌ Env vars SHOPIFY_STORE_DOMAIN или SHOPIFY_STOREFRONT_ACCESS_TOKEN не заданы!",
    )
  }

  const endpoint = `https://${domain}/api/2026-01/graphql.json`

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": accessToken,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error("🚨 Shopify HTTP Error:", res.status, text)
    throw new Error(`Shopify API error: ${text}`)
  }

  return res.json() as Promise<ShopifyResponse<T>>
}
