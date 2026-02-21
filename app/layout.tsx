import type { Metadata } from "next"
import "./globals.css"
import Header from "@/features/header/header"

export const metadata: Metadata = {
  title: "Fragrant Paradise",
  description: "Магазин парфюмерии",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased`}>
        <main>
          <Header />
          <div className="max-w-5xl mx-auto p-4">{children}</div>
        </main>
      </body>
    </html>
  )
}
