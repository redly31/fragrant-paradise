const domain = process.env.SHOPIFY_STORE_DOMAIN
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

export async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string
  variables?: any
}) {
  const endpoint = `https://${domain}/api/2026-01/graphql.json`

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": accessToken!,
    },
    body: JSON.stringify({ query, variables }),
    // next: { revalidate: 60 },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Shopify API error: ${text}`)
  }

  return res.json()
}
