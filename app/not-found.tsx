"use client"

import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { FileQuestion, Home, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-6">
      <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <span className="absolute text-[12rem] font-black text-muted/30 select-none">
            404
          </span>
          <FileQuestion className="relative h-20 w-20 text-primary animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Упс! Страница не найдена
          </h1>
          <p className="mx-auto max-w-125 text-muted-foreground md:text-xl">
            Похоже, адрес был введен неверно или страница больше не существует.
          </p>
        </div>

        <div className="flex flex-col gap-3 min-[400px]:flex-row mt-6">
          <Button asChild size="lg" className="px-8">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              На главную
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="px-8"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Вернуться назад
          </Button>
        </div>
      </div>
    </main>
  )
}
