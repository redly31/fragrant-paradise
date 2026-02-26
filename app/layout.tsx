import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/features/header"
import { ThemeProvider } from "@/shared/ui/theme-provider"
import { Toaster } from "@/shared/components/ui/sonner"

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
        <Toaster
          position="bottom-center"
          duration={1000}
          toastOptions={{
            style: {
              width: "auto",
              minWidth: "max-content",

              left: "50%",
              transform: "translateX(-50%)",
            },
            classNames: {
              toast:
                "group-[.toaster]:!w-auto group-[.toaster]:!max-w-[none] !whitespace-nowrap flex justify-center items-center",
              content: "w-full flex justify-center items-center",
              title: "text-center",
            },
          }}
        />
      </body>
    </html>
  )
}
