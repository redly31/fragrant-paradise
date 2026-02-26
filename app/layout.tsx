import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/features/header"
import { ThemeProvider } from "@/shared/ui/theme-provider"

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
    <html lang="ru" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <Header />
            <div className="max-w-5xl mx-auto p-4">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
